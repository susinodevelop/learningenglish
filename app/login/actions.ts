"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/supabase/url";

function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value.trim() : "";
  if (!next.startsWith("/") || next.startsWith("//")) return "/games#vocabulary";
  return next;
}

function loginUrl(kind: "error" | "message", message: string, next: string) {
  const params = new URLSearchParams({ [kind]: message, next });
  return `/login?${params.toString()}`;
}

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLocaleLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(formData: FormData) {
  const next = safeNext(formData.get("next"));
  if (!isSupabaseConfigured()) {
    redirect(loginUrl("error", "Supabase no está conectado a este despliegue.", next));
  }

  const { email, password } = credentials(formData);
  if (!email || !password) {
    redirect(loginUrl("error", "Introduce email y contraseña.", next));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(loginUrl("error", "No se pudo iniciar sesión. Revisa tus datos o confirma tu email.", next));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const next = safeNext(formData.get("next"));
  if (!isSupabaseConfigured()) {
    redirect(loginUrl("error", "Supabase no está conectado a este despliegue.", next));
  }

  const { email, password } = credentials(formData);
  if (!email || !password || password.length < 8) {
    redirect(loginUrl("error", "Usa un email válido y una contraseña de al menos 8 caracteres.", next));
  }

  const supabase = await createClient();
  const callback = new URL("auth/callback", getSiteUrl());
  callback.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callback.toString(),
    },
  });

  if (error) {
    redirect(loginUrl("error", "No se pudo crear la cuenta. Prueba con otro email o contraseña.", next));
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect(next);
  }

  redirect(loginUrl("message", "Cuenta creada. Revisa tu email para confirmar el acceso.", next));
}

export async function logout() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}

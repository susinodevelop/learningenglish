"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
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

type AuthErrorLike = {
  code?: string;
  message?: string;
};

function authErrorMessage(error: AuthErrorLike, action: "login" | "signup" | "resend") {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLocaleLowerCase();

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "Tu email todavía no está confirmado. Abre el enlace de confirmación o pulsa «Reenviar confirmación».";
  }

  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "Email o contraseña incorrectos. Si acabas de crear la cuenta, confirma primero el email.";
  }

  if (code === "user_banned" || message.includes("user is banned")) {
    return "Esta cuenta no puede iniciar sesión en este momento.";
  }

  if (code === "over_email_send_rate_limit" || message.includes("rate limit")) {
    return "Supabase ha limitado temporalmente el envío de emails. Espera unos minutos antes de reenviar la confirmación.";
  }

  if (code === "email_address_invalid" || message.includes("invalid email")) {
    return "El email no parece válido.";
  }

  if (action === "signup") {
    return "No se pudo crear la cuenta. Prueba con otro email o contraseña.";
  }

  if (action === "resend") {
    return "No se pudo reenviar el email de confirmación. Inténtalo de nuevo dentro de unos minutos.";
  }

  return "No se pudo iniciar sesión. Revisa tus datos o confirma tu email.";
}

async function requestSiteUrl() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host")?.split(",")[0]?.trim();

  if (!host) return getSiteUrl();

  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}/`;
}

async function confirmationRedirect(next: string) {
  const callback = new URL("auth/callback", await requestSiteUrl());
  callback.searchParams.set("next", next);
  return callback.toString();
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
    redirect(loginUrl("error", authErrorMessage(error, "login"), next));
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
  const emailRedirectTo = await confirmationRedirect(next);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo },
  });

  if (error) {
    redirect(loginUrl("error", authErrorMessage(error, "signup"), next));
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect(next);
  }

  redirect(loginUrl("message", "Cuenta creada. Revisa tu email para confirmar el acceso.", next));
}

export async function resendConfirmation(formData: FormData) {
  const next = safeNext(formData.get("next"));
  if (!isSupabaseConfigured()) {
    redirect(loginUrl("error", "Supabase no está conectado a este despliegue.", next));
  }

  const email = String(formData.get("email") ?? "").trim().toLocaleLowerCase();
  if (!email) {
    redirect(loginUrl("error", "Introduce el email de la cuenta que quieres confirmar.", next));
  }

  const supabase = await createClient();
  const emailRedirectTo = await confirmationRedirect(next);
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo },
  });

  if (error) {
    redirect(loginUrl("error", authErrorMessage(error, "resend"), next));
  }

  redirect(loginUrl("message", "Te hemos reenviado el email de confirmación. Usa el enlace más reciente.", next));
}

export async function logout() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}

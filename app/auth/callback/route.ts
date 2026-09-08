import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/games#vocabulary";
  return value;
}

function loginError(origin: string, message: string, next: string) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", message);
  url.searchParams.set("next", next);
  return url;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = safeNext(requestUrl.searchParams.get("next"));
  const providerError = requestUrl.searchParams.get("error_description") ?? requestUrl.searchParams.get("error");

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(loginError(requestUrl.origin, "Supabase no está configurado en este despliegue.", next));
  }

  if (providerError) {
    return NextResponse.redirect(
      loginError(requestUrl.origin, "El enlace de confirmación no es válido, ya se usó o ha caducado. Reenvía la confirmación desde la pantalla de acceso.", next),
    );
  }

  const code = requestUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(
      loginError(requestUrl.origin, "El enlace de confirmación no contiene un código válido. Reenvía la confirmación desde la pantalla de acceso.", next),
    );
  }

  const supabase = await createClient();
  const flowId = requestUrl.searchParams.get("sb_flow_id");
  const { error } = await supabase.auth.exchangeCodeForSession(
    code,
    flowId ? { flowId } : undefined,
  );

  if (error) {
    return NextResponse.redirect(
      loginError(requestUrl.origin, "No se pudo completar la confirmación. Reenvía el email y usa el enlace más reciente en este mismo navegador.", next),
    );
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    return NextResponse.redirect(`${protocol}://${forwardedHost}${next}`);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

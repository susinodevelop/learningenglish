import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;
  const next = request.nextUrl.searchParams.get("next") ?? "/games#vocabulary";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next.startsWith("/") && !next.startsWith("//") ? next.split("#")[0] : "/games";
  redirectTo.search = "";
  if (next.includes("#")) redirectTo.hash = next.slice(next.indexOf("#"));

  if (isSupabaseConfigured() && tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(redirectTo);
  }

  redirectTo.pathname = "/login";
  redirectTo.hash = "";
  redirectTo.searchParams.set("error", "El enlace de confirmación no es válido o ha caducado.");
  return NextResponse.redirect(redirectTo);
}

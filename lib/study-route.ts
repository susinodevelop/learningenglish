import "server-only";
import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "./supabase/config";
import { getCurrentUser } from "./supabase/auth";
import { StudyDatabaseUnavailableError } from "./study-db";

export async function requireStudyUser() {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Supabase is not configured for this deployment." },
        { status: 503 },
      ),
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Authentication required." }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export function studyRouteError(error: unknown) {
  if (error instanceof StudyDatabaseUnavailableError) {
    return NextResponse.json(
      { error: "Supabase Postgres is not connected to this deployment." },
      { status: 503 },
    );
  }

  console.error("Study API error", error);
  return NextResponse.json({ error: "Could not synchronize study data." }, { status: 500 });
}

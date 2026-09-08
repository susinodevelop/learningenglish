import { NextResponse } from "next/server";
import { migrateLocalStudyState } from "@/lib/study-db";
import { parseStudyGroups, parseVocabularyProgress } from "@/lib/study-payload";
import { requireStudyUser, studyRouteError } from "@/lib/study-route";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user, response } = await requireStudyUser();
  if (response || !user) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid migration payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const deviceId = typeof payload.deviceId === "string" ? payload.deviceId.trim() : "";
  const groups = parseStudyGroups(payload.groups);
  const progress = parseVocabularyProgress(payload.progress);

  if (!deviceId || deviceId.length > 180 || !groups || !progress) {
    return NextResponse.json({ error: "Invalid migration payload." }, { status: 400 });
  }

  try {
    const state = await migrateLocalStudyState(user.id, deviceId, groups, progress);
    return NextResponse.json({
      authenticated: true,
      userEmail: user.email ?? null,
      ...state,
    });
  } catch (error) {
    return studyRouteError(error);
  }
}

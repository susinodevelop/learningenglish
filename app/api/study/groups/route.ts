import { NextResponse } from "next/server";
import { replaceStudyGroups } from "@/lib/study-db";
import { parseStudyGroups } from "@/lib/study-payload";
import { requireStudyUser, studyRouteError } from "@/lib/study-route";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const { user, response } = await requireStudyUser();
  if (response || !user) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const groups = body && typeof body === "object" && !Array.isArray(body)
    ? parseStudyGroups((body as Record<string, unknown>).groups)
    : null;

  if (!groups) {
    return NextResponse.json({ error: "Invalid study groups payload." }, { status: 400 });
  }

  try {
    await replaceStudyGroups(user.id, groups);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return studyRouteError(error);
  }
}

import { NextResponse } from "next/server";
import { recordVocabularyAttempt } from "@/lib/study-db";
import { parseStudyAttempt } from "@/lib/study-payload";
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

  const attempt = parseStudyAttempt(body);
  if (!attempt) {
    return NextResponse.json({ error: "Invalid vocabulary attempt payload." }, { status: 400 });
  }

  try {
    await recordVocabularyAttempt(user.id, attempt);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return studyRouteError(error);
  }
}

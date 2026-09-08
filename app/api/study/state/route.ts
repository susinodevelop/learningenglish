import { NextResponse } from "next/server";
import { getStudyState } from "@/lib/study-db";
import { requireStudyUser, studyRouteError } from "@/lib/study-route";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, response } = await requireStudyUser();
  if (response || !user) return response;

  try {
    const state = await getStudyState(user.id);
    return NextResponse.json({
      authenticated: true,
      userEmail: user.email ?? null,
      ...state,
    });
  } catch (error) {
    return studyRouteError(error);
  }
}

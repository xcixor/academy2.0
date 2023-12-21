import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: Request) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId || !user.isCoach) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { clientId, eventURI, inviteeURI } = await req.json();

    const course = await db.session.create({
      data: {
        coachId: userId,
        clientId,
        eventURI,
        inviteeURI,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

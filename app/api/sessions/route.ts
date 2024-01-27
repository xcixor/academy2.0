import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.COACH)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { clientId, eventURI, inviteeURI, title } = await req.json();

    const session = await db.session.create({
      data: {
        coachId: userId,
        clientId,
        eventURI,
        inviteeURI,
        title,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

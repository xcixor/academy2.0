import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.COACH)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, message, recepientId, type } = await req.json();

    const notification = await db.notification.create({
      data: {
        creatorId: userId,
        title,
        message,
        recepientId,
        type,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[NOTIFICATION]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { recipientId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.notification.updateMany({
      where: { recepientId: params.recipientId },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

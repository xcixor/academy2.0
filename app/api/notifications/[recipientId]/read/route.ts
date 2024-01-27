import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { recipientId: string } },
) {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const unReadNotifications = await db.notification.findMany({
      where: {
        isRead: false,
        recepientId: params.recipientId,
      },
    });

    return NextResponse.json(unReadNotifications);
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { recipientId: string } },
) {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await db.notification.updateMany({
      where: { recepientId: params.recipientId },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

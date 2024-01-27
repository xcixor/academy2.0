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
    const all = await db.notification.findMany({
      where: {
        recepientId: params.recipientId,
      },
    });

    return NextResponse.json(all);
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

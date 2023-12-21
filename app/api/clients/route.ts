import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getLoggedInUser();

    const { id } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Coach is required", { status: 403 });
    }

    const clientCoach = await db.clientCoach.update({
      where: { id },
      data: {
        isConfirmed: true,
      },
    });

    return NextResponse.json(clientCoach);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

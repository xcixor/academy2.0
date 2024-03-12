import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const { coach, title, purpose } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!coach || !title || !purpose) {
      return new NextResponse("All fields are required", { status: 403 });
    }

    const review = await db.documentReview.create({
      data: {
        coachId: coach,
        title,
        purpose,
        ownerId: user.id,
      },
    });

    return NextResponse.json({ reviewId: review.id }, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

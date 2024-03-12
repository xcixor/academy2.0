import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(
  req: NextRequest,
  { params }: { params: { reviewId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const { title } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const review = await db.documentReview.findUnique({
      where: {
        id: params.reviewId,
      },
    });
    if (!review) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const reviewDocument = await db.documentReviewDocument.create({
      data: {
        title,
        ownerId: review.id,
      },
    });

    return NextResponse.json(
      { documentId: reviewDocument.id },
      { status: 200 },
    );
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { reviewId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { reviewId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coachReview = await db.coachReview.update({
      where: {
        id: reviewId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(coachReview);
  } catch (error) {
    console.log("[COACH_REVIEW_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { reviewId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coachReview = await db.documentReview.findUnique({
      where: {
        id: params.reviewId,
      },
    });

    if (!coachReview) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedcoachReview = await db.coachReview.delete({
      where: {
        id: params.reviewId,
      },
    });

    return NextResponse.json(deletedcoachReview);
  } catch (error) {
    console.log("[COACH_REVIEW_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

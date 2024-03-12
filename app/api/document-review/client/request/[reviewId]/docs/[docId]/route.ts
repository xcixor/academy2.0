import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { reviewId: string; docId: string } },
) {
  try {
    const user = await getLoggedInUser();

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

    const asset = await db.gCPData.findUnique({
      where: {
        assetId: params.docId,
      },
    });
    if (asset) {
      const response = await fetch(`/api/gcp/asset/${params.docId}`, {
        method: "DELETE",
      });
      console.log(response);
    }

    const deletedDocument = await db.documentReviewDocument.delete({
      where: {
        id: params.docId,
      },
    });

    return NextResponse.json(
      { documentId: deletedDocument.id, message: "Document deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

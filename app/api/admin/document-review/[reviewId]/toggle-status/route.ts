import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { DocumentReviewStatus, PurchaseStatus } from "@prisma/client";


export async function PUT(
  req: NextRequest,
  { params }: { params: { reviewId: string } },
) {
  const reviewId = params.reviewId;

  if (!reviewId) {
    return new NextResponse("Internal server error", { status: 500 });
  }

  

  try {
    const review = await db.documentReview.findUnique({
        where:{
            id:reviewId
        }
    })

    if(review.status === DocumentReviewStatus.APPROVED){
        await db.documentReview.update({
            where:{
                id:reviewId
            },
            data:{
                status:DocumentReviewStatus.PENDING
            }
        })
    }else {
        await db.documentReview.update({
            where:{
                id:reviewId
            },
            data:{
                status:DocumentReviewStatus.APPROVED
            }
        })
    }
    return NextResponse.json({message:"Success"})
 
  } catch (error) {
    console.log("[ORDER_APPROVAL_CAPTURE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

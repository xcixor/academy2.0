import { db } from "@/lib/db";
import {  DocumentReview } from "@prisma/client";

export const getReview = async (reviewId: string):Promise<DocumentReview> => {
  try {
    const review = await db.documentReview.findUnique({
      where: {
        id: reviewId,
      },
    });
    return review;
  } catch (error) {
    console.log("[GET_REVIEW]", error);
    return null;
  }
};

import { db } from "@/lib/db";

export const getReview = async (reviewId: string) => {
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

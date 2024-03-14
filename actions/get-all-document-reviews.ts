import { db } from "@/lib/db";

export const getDocumentReviews = async () => {
  try {
    const reviews = await db.documentReview.findMany({
        include:{
            owner:{
                include: {
                    profile:true
                }
            }
        }
    });
    return reviews;
  } catch (error) {
    console.log("[GET_DOCUMENT_REVIEW_reviews]", error);
    return null;
  }
};

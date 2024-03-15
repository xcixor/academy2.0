import { db } from "@/lib/db";

export const getReviewReviews = async(documentReviewId:string) => {
    try {
        const reviews = await db.coachReview.findMany({
            where:{
                documentReviewId
            }
        })
        return reviews
    } catch (error) {
        console.log("REVIEW_REVIEWS_ERROR");
        return [];
    }
} 
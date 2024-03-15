import { db } from "@/lib/db"
import { DocumentReviewStatus } from "@prisma/client";
export const getCoachDocumentsToReview = async (coachId:string, status=null) => {
    try {
        const reviews = await db.documentReview.findMany({
            where:{
                coachId, status 
            }, include:{
                owner:{
                    include: {
                        profile:true
                    }
                }
            }
        })
        return reviews;
    } catch (error) {
        
    }
}
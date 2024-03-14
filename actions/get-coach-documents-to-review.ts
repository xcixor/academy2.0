import { db } from "@/lib/db"
export const getCoachDocumentsToReview = async (coachId:string) => {
    try {
        const reviews = await db.documentReview.findMany({
            where:{
                coachId 
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
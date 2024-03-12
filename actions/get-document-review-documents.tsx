import { db } from "@/lib/db";

export const getDocumentReviewDocuments = async (reviewId: string) => {
  try {
    const documents = await db.documentReviewDocument.findMany({
      where: {
        ownerId: reviewId,
      },
    });
    return documents;
  } catch (error) {
    console.log("[GET_DOCUMENT_REVIEW_DOCUMENTS]", error);
    return null;
  }
};

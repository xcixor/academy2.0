import { db } from "@/lib/db";
import { DocumentReview, Profile, User } from "@prisma/client";
export const getStudentDocuments = async (
  ownerId: string,
): Promise<(DocumentReview & { user: User & { profile: Profile } })[]> => {
  try {
    const documents = await db.documentReview.findMany({
      where: {
        ownerId,
      },
    });

    // Fetch the user based on the coachId for each document
    const documentsWithUser = await Promise.all(
      documents.map(async (document) => {
        const user = await db.user.findUnique({
          where: {
            id: document.coachId,
          },
          include: {
            profile: true,
          },
        });
        return { ...document, user };
      }),
    );

    return documentsWithUser;
  } catch (error) {
    console.error("Error retrieving student documents:", error);
    return []; // Return an empty list if there are no documents or an error occurs
  }
};

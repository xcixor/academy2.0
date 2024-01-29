import { db } from "@/lib/db";
import { Attachment, Chapter, GCPData } from "@prisma/client";
import { getLatestFileMetaData } from "./get-latest-file-metadata";
import { getCourseOwner } from "./get-course-owner";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}
// type AttachmentWithGCPData = Attachment & {
//   gcpData: GCPData | null;
// };

interface AttachmentWithGCPData extends Attachment {
  gcpData?: GCPData | null;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let gcpData = null;

    let attachments: AttachmentWithGCPData[] = [];
    let nextChapter: Chapter | null = null;

    const isCourseOwner = await getCourseOwner(userId, courseId);

    if (purchase || isCourseOwner) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
      for (const attachment of attachments) {
        const gcpData = await getLatestFileMetaData(attachment.id);
        attachment.gcpData = gcpData;
      }
    }

    if (chapter.isFree || purchase || isCourseOwner) {
      gcpData = await getLatestFileMetaData(chapterId);

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      gcpData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      gcpData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

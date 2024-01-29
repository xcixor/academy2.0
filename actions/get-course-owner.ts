import { db } from "@/lib/db";

export const getCourseOwner = async (ownerId: string, courseId: string) => {
  const course = await db.course.findUnique({
    where: {
      isPublished: true,
      userId: ownerId,
      id: courseId,
    },
    select: {
      price: true,
    },
  });
  if (course) {
    return true;
  }
};

import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "@/@types/db";

export const getComingSoonCourses = async (): Promise<
  CourseWithProgressWithCategory[]
> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: false,
      },
      include: {
        category: true,
        chapters: { where: { isPublished: true }, select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return courses;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};

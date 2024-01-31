import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "@/@types/db";

type GetCourses = { title?: string; categoryId?: string; description?: string };

export const getAllCourses = async ({
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  const formattedTitle = title?.replace(/\s/g, "");
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        categoryId,
        ...(formattedTitle
          ? {
              OR: [
                { title: { contains: title, mode: "insensitive" } },
                { description: { contains: title, mode: "insensitive" } },
              ],
            }
          : {}),
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

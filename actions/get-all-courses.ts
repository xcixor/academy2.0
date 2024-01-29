import { Category, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "@/@types/db";

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export const getAllCourses = async ({
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
          mode: "insensitive",
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};

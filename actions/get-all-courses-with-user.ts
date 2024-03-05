import { db } from "@/lib/db";
import { Course, User } from "@prisma/client";

export async function getCoursesWithUserData(): Promise<
  (Course & { user: { email: User["email"] } })[]
> {
  const courses = await db.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const coursesWithUserData = await Promise.all(
    courses.map(async (course) => {
      const user = await db.user.findUnique({
        where: {
          id: course.userId,
        },
        select: {
          email: true,
        },
      });
      return {
        ...course,
        user,
      };
    }),
  );

  return coursesWithUserData;
}

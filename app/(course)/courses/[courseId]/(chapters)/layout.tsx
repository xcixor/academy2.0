import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import CourseSidebar from "@/components/courses/courseId/CourseSidebar";
import CourseNavbar from "@/components/courses/courseId/CourseNavbar";
import { getLoggedInUser } from "@/lib/auth/utils";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-80">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="h-full pt-[80px] md:pl-80">{children}</main>
    </div>
  );
};

export default CourseLayout;

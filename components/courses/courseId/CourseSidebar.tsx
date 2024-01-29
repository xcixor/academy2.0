import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/CourseProgress";

import CourseSidebarItem from "./CourseSidebarItem";
import { getLoggedInUser } from "@/lib/auth/utils";
import { getCourseOwner } from "@/actions/get-course-owner";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export default async function CourseSidebar({
  course,
  progressCount,
}: CourseSidebarProps) {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/");
  }

  const userId = user.id;

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const isCourseOwner = await getCourseOwner(userId, course.id);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col border-b p-8">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
            isCourseOwner={isCourseOwner!!}
          />
        ))}
      </div>
    </div>
  );
}

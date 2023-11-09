import { Chapter, Course, UserProgress } from "@prisma/client";

import NavbarRoutes from "@/components/navbar/NavbarRoutes";

import CourseMobileSidebar from "./CourseMobileSidebar";
import { getLoggedInUser } from "@/lib/auth/utils";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export default async function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  const user = await getLoggedInUser();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes user={user} />
    </div>
  );
}

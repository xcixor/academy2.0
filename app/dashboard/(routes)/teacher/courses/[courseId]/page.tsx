import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseIdSkeleton from "@/components/dashboard/teacher/courses/courseId/CourseIdSkeleton";
import dynamic from "next/dynamic";
import { getLoggedInUser } from "@/lib/auth/utils";

const CourseIdPageWithCustomLoading = dynamic(
  () =>
    import(
      "@/components/dashboard/teacher/courses/courseId/CourseIdPageWrapper"
    ),
  {
    loading: () => <CourseIdSkeleton />,
  }
);

const page = async ({ params }: { params: { courseId: string } }) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  return (
    <CourseIdPageWithCustomLoading courseId={params.courseId} userId={userId} />
  );
};

export default page;

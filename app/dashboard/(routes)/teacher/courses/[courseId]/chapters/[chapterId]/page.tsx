import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import ChapterIdPageSkeleton from "@/components/dashboard/teacher/courses/courseId/chapters/chapterId/ChapterIdPageSkeleton";
import { getLoggedInUser } from "@/lib/auth/utils";

const ChapterIdPageCustomLoading = dynamic(
  () =>
    import(
      "@/components/dashboard/teacher/courses/courseId/chapters/chapterId/ChapterIdPageWrapper"
    ),
  {
    loading: () => <ChapterIdPageSkeleton />,
  }
);

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    redirect("/");
  }
  return (
    <ChapterIdPageCustomLoading
      courseId={params.courseId}
      chapterId={params.chapterId}
    />
  );
}

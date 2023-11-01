import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import ChapterIdPageSkeleton from "@/components/dashboard/teacher/courses/courseId/chapters/chapterId/ChapterIdPageSkeleton";

const ChapterIdPageCustomLoading = dynamic(
  () =>
    import(
      "@/components/dashboard/teacher/courses/courseId/chapters/chapterId/ChapterIdPageWrapper"
    ),
  {
    loading: () => <ChapterIdPageSkeleton />,
  }
);

export default function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

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

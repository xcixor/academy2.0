import { redirect } from "next/navigation";
import ChapterIdPageWrapper from "@/components/dashboard/teacher/courses/courseId/chapters/chapterId/ChapterIdPageWrapper";
import { getLoggedInUser } from "@/lib/auth/utils";

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/");
  }
  return (
    <ChapterIdPageWrapper
      courseId={params.courseId}
      chapterId={params.chapterId}
    />
  );
}

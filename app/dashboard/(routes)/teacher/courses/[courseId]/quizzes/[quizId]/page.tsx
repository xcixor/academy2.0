import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import QuizIdSkeleton from "@/components/dashboard/teacher/courses/courseId/quizzes/quizId/QuizIdPageSkeleton";
import { getLoggedInUser } from "@/lib/auth/utils";

const QuizIdPageCustomLoading = dynamic(
  () =>
    import(
      "@/components/dashboard/teacher/courses/courseId/quizzes/quizId/QuizIdPageWrapper"
    ),
  {
    loading: () => <QuizIdSkeleton />,
  },
);

export default async function QuizIdPage({
  params,
}: {
  params: { courseId: string; quizId: string };
}) {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/");
  }
  return (
    <QuizIdPageCustomLoading
      courseId={params.courseId}
      quizId={params.quizId}
    />
  );
}

import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import QuestionIdPageSkeleton from "@/components/dashboard/teacher/courses/courseId/quizzes/quizId/questions/questionId/QuestionIdPageSkeleton";
import { getLoggedInUser } from "@/lib/auth/utils";

const QuestionIdPageCustomLoading = dynamic(
  () =>
    import(
      "@/components/dashboard/teacher/courses/courseId/quizzes/quizId/questions/questionId/QuestionIdPageWrapper"
    ),
  {
    loading: () => <QuestionIdPageSkeleton />,
  }
);

export default async function QuestionIdPage({
  params,
}: {
  params: { courseId: string; quizId: string; questionId: string };
}) {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    redirect("/");
  }
  return (
    <QuestionIdPageCustomLoading
      questionId={params.questionId}
      quizId={params.quizId}
      courseId={params.courseId}
    />
  );
}

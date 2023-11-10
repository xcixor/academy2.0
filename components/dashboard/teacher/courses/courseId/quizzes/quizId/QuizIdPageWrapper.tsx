import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileQuestion, LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/IconBadge";
import { Banner } from "@/components/Banner";

import QuizTitleForm from "./QuizTitleForm";
import QuizDescriptionForm from "./QuizDescriptionForm";

import { QuizActions } from "./QuizActions";
import { getLoggedInUser } from "@/lib/auth/utils";
import QuestionsForm from "./QuestionsForm";
import QuizPercentageForm from "./QuizPercentage";

interface Props {
  courseId: string;
  quizId: string;
}

const QuizIdPageWrapper = async ({ courseId, quizId }: Props) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: quizId,
      courseId: courseId,
    },
    include: {
      questions: true,
    },
  });

  if (!quiz) {
    return redirect("/");
  }

  const requiredFields = [quiz.title, quiz.description, quiz.passingPercentage];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This quiz is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Quiz Setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuizActions
                disabled={!isComplete}
                courseId={courseId}
                quizId={quizId}
                isPublished={quiz.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your quiz</h2>
          </div>
          <div className="md:w-1/2 gap-6 mt-16 ">
            <QuizTitleForm
              initialData={quiz}
              courseId={courseId}
              quizId={quizId}
            />
            <QuizDescriptionForm
              initialData={quiz}
              courseId={courseId}
              quizId={quizId}
            />
            <QuizPercentageForm
              initialData={quiz}
              courseId={courseId}
              quizId={quizId}
            />
          </div>
        </div>

        <div className="mt-4 space-x-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={FileQuestion} />
              <h2 className="text-xl">Questions</h2>
            </div>
            <QuestionsForm
              initialData={quiz}
              courseId={courseId}
              isDeleting={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizIdPageWrapper;

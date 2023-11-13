import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileQuestion, LayoutDashboard, Option } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/IconBadge";
import { Banner } from "@/components/Banner";

import QuestionTitleForm from "./QuestionTitleForm";

import { QuestionActions } from "./QuestionActions";
import { getLoggedInUser } from "@/lib/auth/utils";
import OptionsForm from "./OptionsForm";
import AnswerForm from "./AnswerForm";

interface Props {
  courseId: string;
  quizId: string;
  questionId: string;
}

const QuestionIdPageWrapper = async ({
  questionId,
  quizId,
  courseId,
}: Props) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const question = await db.question.findUnique({
    where: {
      id: questionId,
      quizId: quizId,
    },
    include: {
      options: true,
    },
  });

  if (!question) {
    return redirect("/");
  }

  const requiredFields = [question.title, question.options.length > 1];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!question.isPublished && (
        <Banner
          variant="warning"
          label="This question is unpublished. It will not be visible in the quiz"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/teacher/courses/${courseId}/quizzes/${quizId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to quiz setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Question Setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuestionActions
                disabled={!isComplete}
                courseId={courseId}
                questionId={questionId}
                isPublished={question.isPublished}
                quizId={quizId}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize Your Question</h2>
          </div>
          <div className="md:flex gap-4 mt-16">
            <div className="md:w-1/2 gap-6">
              <QuestionTitleForm
                initialData={question}
                courseId={courseId}
                questionId={questionId}
                quizId={quizId}
              />
            </div>
            <div className="md:w-1/2 gap-6">
              <AnswerForm
                initialData={question}
                courseId={courseId}
                questionId={questionId}
                quizId={quizId}
                options={question.options.map((option) => ({
                  label: option.title,
                  value: option.id,
                  isAnswer: option.isAnswer,
                }))}
                isDeleting={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 space-x-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Option} />
              <h2 className="text-xl">Options</h2>
            </div>
            <OptionsForm
              initialData={question}
              courseId={courseId}
              isDeleting={false}
              quizId={quizId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionIdPageWrapper;

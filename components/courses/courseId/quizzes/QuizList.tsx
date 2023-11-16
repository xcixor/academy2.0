import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { AlertTriangle, CheckCircle2, ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  courseId: string;
};

const QuizList = async ({ courseId }: Props) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return (
      <div className="flex items-center justify-center w-full">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
    );
  }

  const quizzes = await db.quiz.findMany({
    where: {
      courseId: courseId,
      isPublished: true,
    },
    include: {
      submissions: {
        where: {
          userId: userId,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {quizzes.map((quiz) => (
        <Link
          href={`/courses/${courseId}/quizzes/${quiz.id}`}
          key={quiz.id}
          target="_blank"
        >
          <span className="flex items-center justify-between ">
            <span className="font-semibold text-sky-700 hover:underline hover:text-sky-500 flex items-center">
              {quiz.title} <ChevronsRight />
            </span>
            {quiz.submissions[0] && (
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            )}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuizList;

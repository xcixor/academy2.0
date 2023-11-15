import { db } from "@/lib/db";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  courseId: string;
};

const QuizList = async ({ courseId }: Props) => {
  const quizzes = await db.quiz.findMany({
    where: {
      courseId: courseId,
      isPublished: true,
    },
  });

  return (
    <div className="p-4">
      {quizzes.map((quiz) => (
        <Link
          href={`/courses/${courseId}/quizzes/${quiz.id}`}
          key={quiz.id}
          target="_blank"
        >
          <span className="font-semibold text-sky-700 hover:underline hover:text-sky-500 flex items-center">
            {quiz.title} <ChevronsRight />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuizList;

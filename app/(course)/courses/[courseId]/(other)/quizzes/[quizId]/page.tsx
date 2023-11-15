"use client";

import QuestionList from "@/components/courses/courseId/quizzes/QuestionList";
import QuizList from "@/components/dashboard/teacher/courses/courseId/QuizList";

import { db } from "@/lib/db";
import { fetcher } from "@/lib/utils";
import { Question, Quiz } from "@prisma/client";
import { AlertTriangle, Loader2 } from "lucide-react";
import useSWR from "swr";

type Props = {
  params: {
    quizId: string;
    courseId: string;
  };
};

type QuizWithQuestion = Quiz & {
  questions: Question[];
};

const QuestionPage = ({ params }: Props) => {
  // const quiz = await db.quiz.findUnique({
  //   where: { id: params.quizId },
  //   include: { questions: true },
  // });
  const url = `http://localhost:3000/api/courses/${params.courseId}/quizzes/${params.quizId}/`;

  const { data, mutate, isLoading, error } = useSWR(url, fetcher);
  const quiz = data as QuizWithQuestion;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
        <p className="text-zinc-500">Readying...</p>
      </div>
    );
  }

  if (!quiz || error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className=" h-8 w-8 text-red-400" />
        <p className="text-red-400">Something went wrong...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="md:grid grid-cols-2 w-full h-full">
        <div className="bg-slate-100 flex flex-col justify-center items-center ">
          {quiz?.title}
        </div>
        <QuestionList
          courseId={params.courseId}
          quizId={params.quizId}
          quiz={quiz}
        />
      </div>
    </div>
  );
};

export default QuestionPage;

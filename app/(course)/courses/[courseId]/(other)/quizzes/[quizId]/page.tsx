"use client";

import QuestionList from "@/components/courses/courseId/quizzes/QuestionList";
import { fetcher } from "@/lib/utils";
import { Question, Quiz, Submission } from "@prisma/client";
import { AlertTriangle, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";

type Props = {
  params: {
    quizId: string;
    courseId: string;
  };
};

type QuizWithQuestionsAndSubmissions = Quiz & {
  questions: Question[];
  submissions: Submission[];
};

const QuestionPage = ({ params }: Props) => {
  const url = `/api/courses/${params.courseId}/quizzes/${params.quizId}/`;

  const { data, isLoading, error } = useSWR(url, fetcher);
  const quiz = data as QuizWithQuestionsAndSubmissions;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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

  if (quiz.submissions.length > 0) {
    toast.success("You have already taken that quiz");
    redirect(`/courses/${params.courseId}/`);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-full w-full grid-cols-2 md:grid">
        <div className="flex flex-col items-center justify-center bg-slate-100 ">
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

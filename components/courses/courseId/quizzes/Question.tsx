"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { AlertTriangle, Loader2 } from "lucide-react";
import QuestionForm from "./QuestionForm";
import { fetcher } from "@/lib/utils";
import { Option, Quiz, Response } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  questionId: string;
  courseId: string;
  quizId: string;
  toggleHasSubmitted: () => void;
  hasSubmitted: boolean;
  forceHasSubmitted: () => void;
  confirmSubmission: () => void;
};

type QuestionWithOptionsAndResponses = Quiz & {
  options: Option[];
  responses: Response[];
};

const QuestionComponent = ({
  questionId,
  quizId,
  courseId,
  toggleHasSubmitted,
  hasSubmitted,
  confirmSubmission,
}: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  const user = session?.user;

  const url = `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`;

  const { data, isLoading, error } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  const question = data as QuestionWithOptionsAndResponses;

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-zinc-500">Readying...</p>
      </div>
    );
  }

  if (!question || error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <AlertTriangle className=" h-8 w-8 text-red-400" />
        <p className="text-red-400">Something went wrong...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-sky-100 p-4">
      <div className="bg-sky-200 p-4 shadow-sm">
        <h4 className="font-semibold">{question.title}</h4>
      </div>
      <div className="mt-4 flex flex-col">
        <QuestionForm
          options={question.options}
          toggleHasSubmitted={toggleHasSubmitted}
          hasSubmitted={hasSubmitted}
          courseId={courseId}
          questionId={questionId}
          quizId={quizId}
          confirmSubmission={confirmSubmission}
        />
      </div>
    </div>
  );
};

export default QuestionComponent;

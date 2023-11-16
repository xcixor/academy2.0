import { Question, Quiz, Submission } from "@prisma/client";
import useListComponents from "@/hooks/useListComponents";
import QuestionComponent from "@/components/courses/courseId/quizzes/Question";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type QuizWithQuestionsAndSubmissions = Quiz & {
  questions: Question[];
  submissions: Submission[];
};

type Props = {
  courseId: string;
  quizId: string;
  quiz: QuizWithQuestionsAndSubmissions;
};

const QuestionList = ({ courseId, quizId, quiz }: Props) => {
  const router = useRouter();

  if (quiz.submissions.length > 0) {
    toast.success("You have already taken that quiz");
    redirect(`/courses/${courseId}/`);
  }
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [confirmSubmissionSuccess, setConfirmSubmissionSuccess] =
    useState<boolean>(false);
  const toggleHasSubmitted = () => setHasSubmitted((current) => !current);
  const forceHasSubmitted = () => {
    setHasSubmitted(true);
  };
  const confirmSubmission = () => {
    setConfirmSubmissionSuccess(true);
  };
  const {
    step,
    next,
    isLastStep,
    back,
    isFirstStep,
    steps,
    currentStepIndex,
    goTo,
  } = useListComponents(
    quiz.questions.map((question) => (
      <QuestionComponent
        key={question.id}
        questionId={question.id}
        courseId={courseId}
        quizId={quizId}
        toggleHasSubmitted={toggleHasSubmitted}
        hasSubmitted={hasSubmitted}
        forceHasSubmitted={forceHasSubmitted}
        confirmSubmission={confirmSubmission}
      />
    ))
  );

  useEffect(() => {
    if (confirmSubmissionSuccess) {
      if (!isLastStep) {
        goTo(currentStepIndex + 1);
      }
    }
    setConfirmSubmissionSuccess(false);
  }, [confirmSubmissionSuccess, currentStepIndex, goTo, isLastStep]);

  const confetti = useConfettiStore();
  const finish = async () => {
    try {
      await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/submissions/`
      );
      router.push(`/courses/${courseId}`);
      confetti.onOpen();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const progressValue = Math.round(
    ((currentStepIndex + 1) / steps.length) * 100
  );

  const handleNext = () => {
    setHasSubmitted(false);
    next();
  };
  const handleBack = () => {
    setHasSubmitted(false);
    back();
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center gap-2">
        {isLastStep ? (
          <>
            {" "}
            <Progress value={100} className="basis-[70%]" />{" "}
            <div className="flex-1">
              <p> Last Question </p>
            </div>
          </>
        ) : (
          <>
            <Progress value={progressValue} className="basis-[70%]" />{" "}
            <div className="flex-1">
              Question {currentStepIndex + 1} of {steps.length}
            </div>
          </>
        )}
      </div>
      {step}

      {/* navigation  */}
      <div className="flex gap-4 p-4 bg-sky-600">
        <>
          {!isFirstStep && (
            <Button
              onClick={() => handleBack()}
              type="button"
              className={cn(
                "py-2 px-3 text-sm border border-slate-200 rounded-sm flex items-center gap-x-1 hover:border-zinc-500 hover:bg-zinc-200  transition",
                true && "border-sky-700 bg-white text-sky-800"
              )}
            >
              <ChevronLeft /> Previous Question
            </Button>
          )}

          <Button
            onClick={isLastStep ? () => finish() : () => handleNext()}
            type="button"
            className={cn(
              "py-2 px-3 text-sm border border-slate-200 rounded-sm flex items-center gap-x-1 hover:border-zinc-500 hover:bg-zinc-200  transition",
              true && "border-sky-700 bg-white text-sky-800"
            )}
          >
            {isLastStep ? (
              "Finish"
            ) : (
              <>
                Next Question <ChevronRight />
              </>
            )}
          </Button>
        </>
      </div>
    </div>
  );
};

export default QuestionList;

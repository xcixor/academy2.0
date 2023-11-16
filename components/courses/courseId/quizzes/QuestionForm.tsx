"use client";
import toast from "react-hot-toast";
import { Option, Response } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useState } from "react";

type Props = {
  options: Option[];
  toggleHasSubmitted: () => void;
  hasSubmitted: boolean;
  courseId: string;
  questionId: string;
  quizId: string;
  confirmSubmission: () => void;
};

const QuestionForm = ({
  options,
  toggleHasSubmitted,
  courseId,
  questionId,
  quizId,
  confirmSubmission,
}: Props) => {
  const ids = options.map((option) => option.id);
  const FormSchema = z.object({
    optionId: z.enum([ids[0], ...ids], {
      required_error: "You need to select an answer.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}/responses/`,
        values
      );
      toggleHasSubmitted();
      confirmSubmission();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toggleChanging();
    }
  }

  const url = `http://localhost:3000/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}/responses`;

  const { data, isLoading, isValidating } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  const submittedResponse = data as Response;

  const [isChanging, setIsChanging] = useState(false);

  const toggleChanging = () => setIsChanging((current) => !current);

  const handleChange = () => {
    toggleHasSubmitted();
    setIsChanging(true);
  };

  const radioItems = options.map((option) => {
    return (
      <FormItem
        className="flex items-center space-x-4 space-y-0 p-4 border-4 border-zinc-300"
        key={option.id}
      >
        <FormControl>
          <RadioGroupItem value={option.id} />
        </FormControl>
        <FormLabel className="font-normal">{option.title}</FormLabel>
      </FormItem>
    );
  });

  console.log(isChanging, "is changing");

  const submitSection = () => {
    return (
      <div className="flex gap-4">
        {submittedResponse && (
          <div className="flex items-center ">
            <CheckCircle2 className="h-4 w-4 text-zinc-500 me-2" />
            <p className="text-zinc-500">Answer Submitted</p>
          </div>
        )}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting || !isChanging}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-pulse " />
          ) : (
            <span>{submittedResponse ? "ReSubmit" : "Submit"}</span>
          )}
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
        <p className="text-zinc-500">Readying...</p>
      </div>
    );
  }
  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
        <p className="text-zinc-500">Readying...</p>
      </div>
    );
  }
  if (submittedResponse) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="optionId"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl onChange={handleChange}>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={submittedResponse?.optionId}
                    className="flex flex-col space-y-1"
                  >
                    {radioItems}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitSection()}
        </form>
      </Form>
    );
  }
  if (!submittedResponse && !isLoading && !isValidating) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="optionId"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl onChange={handleChange}>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {radioItems}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitSection()}
        </form>
      </Form>
    );
  }
};

export default QuestionForm;

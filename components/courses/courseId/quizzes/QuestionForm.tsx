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
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useState } from "react";

type Props = {
  options: Option[];
  toggleHasSubmitted: () => void;
  hasSubmitted: boolean;
  courseId: string;
  questionId: string;
  quizId: string;
  submittedResponse?: Response | null;
  confirmSubmission: () => void;
};

const QuestionForm = ({
  options,
  toggleHasSubmitted,
  courseId,
  questionId,
  quizId,
  submittedResponse,
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

  const [currentResponse, setCurrentResponse] = useState<
    Response | null | undefined
  >(submittedResponse);

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      console.log("submitted", JSON.stringify(values, null, 2));
      const res = await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}/responses/`,
        values
      );
      toggleHasSubmitted();
      confirmSubmission();
      setCurrentResponse(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const handleChange = () => {
    toggleHasSubmitted();
  };

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
                  {options.map((option) => (
                    <FormItem
                      className="flex items-center space-x-4 space-y-0 p-4 border-4 border-zinc-300"
                      key={option.id}
                    >
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.title}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          {submittedResponse && (
            <div className="flex items-center ">
              <CheckCircle2 className="h-4 w-4 text-zinc-500 me-2" />
              <p className="text-zinc-500">Answer Submitted</p>
            </div>
          )}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {submittedResponse ? "ReSubmit" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;

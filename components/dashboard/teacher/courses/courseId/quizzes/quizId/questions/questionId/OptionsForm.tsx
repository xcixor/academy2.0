"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Ban, Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Question, Option } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import OptionList from "./OptionList";

interface OptionsFormProps {
  initialData: Question & { options: Option[] };
  courseId: string;
  quizId: string;
  isDeleting: boolean;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export default function OptionsForm({
  initialData,
  courseId,
  quizId,
  isDeleting,
}: OptionsFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${initialData?.id}/options`,
        values
      );
      toast.success("Option created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${initialData?.id}/options/reorder`,
        {
          list: updateData,
        }
      );
      toast.success("Options reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const [isEditingOptionTitle, setIsEditingOptionTitle] =
    useState<boolean>(false);
  const [editingTitleId, setEditingTitleId] = useState<string>("");

  const onEdit = (id: string) => {
    // router.push(
    //   `/dashboard/teacher/courses/${courseId}/quizzes/${quizId}/questions/${initialData?.id}/`
    // );
    console.log(id, "...................editing id");
    setIsEditingOptionTitle(true);
    setEditingTitleId(id);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4 z-0">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center cursor-not-allowed">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Question Options
        {isDeleting ? (
          <Ban className="h-4 w-4" />
        ) : (
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an option
              </>
            )}
          </Button>
        )}
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Who was the first man to land on the moon?'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.options.length && "text-slate-500 italic"
          )}
        >
          {!initialData.options.length && "No options"}
          <OptionList
            // onEdit={onEdit}
            courseId={courseId}
            quizId={quizId}
            questionId={initialData.id}
            onReorder={onReorder}
            items={initialData.options || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the options
        </p>
      )}
    </div>
  );
}

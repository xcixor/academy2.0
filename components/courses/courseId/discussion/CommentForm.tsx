"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface FormProps {
  courseId: string;
}

const formSchema = z.object({
  message: z.string().min(1, {
    message: "A Message is required",
  }),
});

export default function CommentForm({ courseId }: FormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/comment/${courseId}`, values);
      toast.success("Success");
      router.refresh();
      form.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full items-center gap-[5%]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="basis-[80%]">
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment"
                    className="focus:border-none focus:outline-none focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="h-full flex-1 text-end">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

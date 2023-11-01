"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

export default function CommentForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="flex w-full items-center gap-[5%]">
        <div className="basis-[80%]">
          <FormField
            name="username"
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

import React from "react";
import CourseIdPage from "./CourseIdPage";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface Props {
  courseId: string;
  userId: string;
}

const CourseIdPageWrapper = async ({ courseId, userId }: Props) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      quizzes: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const plans = await db.plan.findMany();
  return <CourseIdPage course={course} categories={categories} plans={plans} />;
};

export default CourseIdPageWrapper;

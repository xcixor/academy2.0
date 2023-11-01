import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseIdSkeleton from "@/components/dashboard/teacher/courses/courseId/CourseIdSkeleton";
import dynamic from "next/dynamic";

const CourseIdPageWithCustomLoading = dynamic(
  () => import("@/components/dashboard/teacher/courses/courseId/CourseIdPage"),
  {
    loading: () => <CourseIdSkeleton />,
  }
);

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
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
  return (
    <CourseIdPageWithCustomLoading
      course={course}
      categories={categories}
      plans={plans}
    />
  );
};

export default page;

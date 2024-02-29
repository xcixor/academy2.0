import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: Record<"callbackUrl", string>;
  params: {
    courseId: string;
  };
};
const CourseIdPage = async (props: Props) => {
  const course = await db.course.findUnique({
    where: {
      id: props.params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course || course.chapters.length === 0) {
    return redirect(
      props.searchParams.callbackUrl
        ? props.searchParams.callbackUrl
        : "/browse",
    );
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;

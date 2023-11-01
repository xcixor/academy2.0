import dynamic from "next/dynamic";
import CoursePageSkeleton from "@/components/courses/courseId/chapters/chapterId/CoursePageSkeleton";

const CoursePageWithSkeleton = dynamic(
  () =>
    import("@/components/courses/courseId/CourseChapter").then(
      (mod) => mod.default
    ),
  {
    loading: () => <CoursePageSkeleton />,
  }
);

const page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  return <CoursePageWithSkeleton params={params} />;
};

export default page;

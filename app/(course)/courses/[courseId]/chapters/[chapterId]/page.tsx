import dynamic from "next/dynamic";
import CoursePageSkeleton from "./_components/CoursePageSkeleton";

const CoursePageWithSkeleton = dynamic(
  () => import("./CourseChapter").then((mod) => mod.default),
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

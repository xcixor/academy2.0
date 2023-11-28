import CourseChapter from "@/components/courses/courseId/CourseChapter";

const page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  return <CourseChapter params={params} />;
};

export default page;

import { TeacherCoursesPageSkeleton } from "@/components/dashboard/teacher/courses/TeacherCoursesPageSkeleton";
import dynamic from "next/dynamic";

const SearchPageCustomLoading = dynamic(
  () =>
    import("@/components/dashboard/teacher/courses/CoursePage"),
  {
    loading: () => <TeacherCoursesPageSkeleton />,
  }
);

const Page = async () => {
  return <SearchPageCustomLoading />;
};

export default Page;

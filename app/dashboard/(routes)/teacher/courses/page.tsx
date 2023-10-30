import { TeacherCoursesPageSkeleton } from "./_components/TeacherCoursesPageSkeleton";
import dynamic from "next/dynamic";

const SearchPageCustomLoading = dynamic(() => import("./CoursePage"), {
  loading: () => <TeacherCoursesPageSkeleton />,
});

const Page = async () => {
  return <SearchPageCustomLoading />;
};

export default Page;

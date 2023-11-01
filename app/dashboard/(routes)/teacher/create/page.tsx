import CreatePageSkeleton from "@/components/dashboard/teacher/create/CreatePageSkeleton";
import dynamic from "next/dynamic";

const CreateCourseWithCustomLoading = dynamic(
  () => import("@/components/dashboard/teacher/create/CreateCourse"),
  {
    loading: () => <CreatePageSkeleton />,
  }
);

const page = () => {
  return <CreateCourseWithCustomLoading />;
};

export default page;

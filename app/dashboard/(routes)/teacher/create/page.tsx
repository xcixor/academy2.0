import CreatePageSkeleton from "@/components/dashboard/teacher/create/CreatePageSkeleton";
import dynamic from "next/dynamic";

const CreateCourseWithCustomLoading = dynamic(() => import("./CreateCourse"), {
  loading: () => <CreatePageSkeleton/>,
});

const page = () => {
  return <CreateCourseWithCustomLoading />;
};

export default page;

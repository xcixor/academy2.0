import SubmissionsTable from "@/components/dashboard/teacher/quizzes/quizId/SubmissionsTable";

type Props = {
  params: {
    quizId: string;
  };
};

const page = ({ params }: Props) => {
  return <SubmissionsTable quizId={params.quizId} />;
};

export default page;

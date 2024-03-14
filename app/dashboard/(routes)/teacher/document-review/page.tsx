import { getCoachDocumentsToReview } from "@/actions/get-coach-documents-to-review";
import { DataTable } from "@/components/dashboard/teacher/document-review/DataTable";
import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { columns } from "@/components/dashboard/teacher/document-review/Columns";

const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }
  const reviews = await getCoachDocumentsToReview(user.id);
  return (
    <div className="p-12">
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default page;

import { getCoachDocumentsToReview } from "@/actions/get-coach-documents-to-review";
import { DataTable } from "@/components/dashboard/teacher/document-review/DataTable";
import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { columns } from "@/components/dashboard/teacher/document-review/Columns";
import { DocumentReviewStatus } from "@prisma/client";

const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }
  const reviews = await getCoachDocumentsToReview(user.id, DocumentReviewStatus.APPROVED);
  if (!reviews || reviews.length < 1) {
    return (
      <div className="p-12">
        <p>No reviews at the moment</p>
      </div>
    );
  }
  return (
    <div className="p-12">
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default page;

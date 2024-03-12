import { getStudentDocuments } from "@/actions/get-student-documents";
import { columns } from "@/components/dashboard/clients/docs/Columns";
import { DataTable } from "@/components/dashboard/clients/docs/DataTable";
import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/");
  }
  const documents = await getStudentDocuments(user.id);
  return (
    <div className="gap-4 p-6 ">
      <h1 className="text-lg font-bold">My Review History</h1>
      <DataTable columns={columns} data={documents} />
    </div>
  );
};

export default page;

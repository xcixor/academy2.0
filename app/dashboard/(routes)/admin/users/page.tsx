import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/dashboard/admin/users/DataTable";
import { columns } from "@/components/dashboard/admin/users/Columns";
import { getLoggedInUser } from "@/lib/auth/utils";
const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId || !user.isAdmin) {
    return redirect("/");
  }
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default page;

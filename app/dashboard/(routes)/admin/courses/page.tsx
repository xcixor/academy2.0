import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/dashboard/admin/courses/DataTable";
import { columns } from "@/components/dashboard/admin/courses/Columns";
import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";
const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default page;

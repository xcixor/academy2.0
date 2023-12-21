import { columns } from "@/components/dashboard/teacher/sessions/Columns";
import { DataTable } from "@/components/dashboard/teacher/sessions/DataTable";
import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const getClient = async (id) => {
    return await db.user.findUnique({ where: id });
  };

  const sessions = await db.session.findMany({ where: { coachId: userId } });
  const sessionData = [];
  sessions.forEach(async (session) => {
    sessionData.push({
      ...session,
      client: getClient(session.clientId),
    });
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={sessions} />
    </div>
  );
};

export default page;

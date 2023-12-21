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
    const client = await db.user.findUnique({ where: { id: id } });
    return client.email;
  };

  const sessions = await db.session.findMany({ where: { coachId: userId } });
  const sessionData = [];

  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    const client = await getClient(session.clientId);
    sessionData.push({ ...session, client });
  }
  console.log(sessionData);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={sessionData} />
    </div>
  );
};

export default page;

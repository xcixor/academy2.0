import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SessionCard from "@/components/dashboard/session/SessionCard";

const page = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/");
  }
  const sessions = await db.session.findMany({
    where: { clientId: user.id },
    include: { coach: { include: { profile: true } } },
  });
  return (
    <div className="grid-cols-3 gap-4 p-6 md:grid">
      {sessions.map((session) => (
        <div key={session.id}>
          <SessionCard session={session} />
        </div>
      ))}
    </div>
  );
};

export default page;

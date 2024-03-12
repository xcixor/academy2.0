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
    <>
      {sessions.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          You do not have any previous sessions
        </div>
      )}
      <div className="grid-cols-3 gap-4 p-6 md:grid">
        {sessions.map((session) => (
          <div key={session.id}>
            <SessionCard session={session} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;

import Coach from "@/components/dashboard/coach/Coach";
import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) {
    return redirect("/");
  }
  const coaches = await db.user.findMany({
    where: { isCoach: true },
    include: { profile: true },
  });
  const myCoaches = await db.clientCoach.findMany({
    where: { clientId: user.id },
  });

  return (
    <div className="grid-cols-3 p-6 md:grid">
      {coaches.map((coach) => (
        <div key={coach.id} className="">
          <Coach coach={coach} myCoaches={myCoaches} />
        </div>
      ))}
    </div>
  );
};

export default page;

import Client from "@/components/dashboard/clients/Client";
import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) {
    return redirect("/");
  }
  const clients = await db.clientCoach.findMany({
    where: { coachId: user.id },
  });
  return (
    <>
      <div className="grid-cols-3 p-6 md:grid">
        {clients.map((client) => (
          <div key={client.id} className="">
            <Client client={client} />
          </div>
        ))}
      </div>
      {clients.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center ">
          <p className="text-sm text-muted-foreground">
            You do not have any clients at the moment.
          </p>
        </div>
      )}
    </>
  );
};

export default page;

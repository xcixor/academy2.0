import CalendlyURLForm from "@/components/dashboard/teacher/sessions/create/CalendlyUrlForm";
import CalendlyWidget from "@/components/dashboard/teacher/sessions/create/CalendlyWidget";
import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { clientId: string } }) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const requisites = await db.coachRequisites.findUnique({
    where: { coachId: userId },
  });

  const client = await db.user.findUnique({
    where: { id: params.clientId },
    include: { profile: true },
  });

  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
      <div className="w-2/3">
        {requisites?.calendlyURL ? (
          <CalendlyWidget
            calendlyURL={requisites.calendlyURL}
            client={client}
          />
        ) : (
          <CalendlyURLForm
            initialData={{
              calendlyURL: "",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default page;

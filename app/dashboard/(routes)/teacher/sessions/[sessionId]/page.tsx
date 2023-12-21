import { Actions } from "@/components/dashboard/teacher/sessions/[sessionId]/Actions";
import PriceForm from "@/components/dashboard/teacher/sessions/[sessionId]/PriceForm";
import { db } from "@/lib/db";
import { Album } from "lucide-react";
import React from "react";

type Props = {
  params: {
    sessionId: string;
  };
};

const page = async ({ params }: Props) => {
  const session = await db.session.findUnique({
    where: { id: params.sessionId },
  });
  return (
    <div className="p-6">
      <div className="flex w-1/2 items-center justify-between">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          Session Setup
          <Album className="h-6 w-6 text-primary" />
        </h1>
        <Actions sessionId={session.id} />
      </div>

      <div className="mb-8 gap-6 md:flex">
        <div className="basis-1/2">
          <PriceForm initialData={session} sessionId={params.sessionId} />
        </div>
      </div>
    </div>
  );
};

export default page;

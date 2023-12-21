import { Actions } from "@/components/dashboard/teacher/sessions/[sessionId]/Actions";
import PriceForm from "@/components/dashboard/teacher/sessions/[sessionId]/PriceForm";
import TitleForm from "@/components/dashboard/teacher/sessions/[sessionId]/TitleForm";
import { db } from "@/lib/db";
import {
  Album,
  ChevronFirstIcon,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
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
  const client = await db.user.findUnique({
    where: { id: session.clientId },
    include: { profile: true },
  });
  return (
    <div className="p-6">
      <div>
        <Link
          href="/dashboard/teacher/sessions"
          className="flex items-center text-sky-500 hover:text-sky-400"
        >
          <ChevronLeft />
          Back
        </Link>
      </div>
      <div className="flex w-1/2 items-center justify-between">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          Session Setup
          <Album className="h-6 w-6 text-primary" />
        </h1>
        <Actions sessionId={session.id} />
      </div>

      <div className="mb-8 gap-6 md:flex">
        <div className="basis-1/2">
          <div className="space-y-4">
            <p className="font-semibold text-zinc-500">
              Session for: {client.email}
            </p>
            <Link
              href={session.eventURI}
              target="_blank"
              className="flex items-center gap-2 text-sky-500 hover:text-sky-400 hover:underline"
            >
              Event URI <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href={session.inviteeURI}
              target="_blank"
              className="flex items-center gap-2 text-sky-500 hover:text-sky-400 hover:underline"
            >
              Invitee URI <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          <TitleForm initialData={session} sessionId={params.sessionId} />
        </div>
      </div>
    </div>
  );
};

export default page;

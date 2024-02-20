import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AttachmentForm from "@/components/dashboard/teacher/courses/courseId/AttachmentForm";
import { db } from "@/lib/db";
import AttachmentTitleForm from "@/components/dashboard/teacher/courses/courseId/attachment/AttachmentTitle";
import { AttachmentActions } from "@/components/dashboard/teacher/courses/courseId/attachment/AttachmentActions";

export default async function AttachmentIdPage({
  params,
}: {
  params: { courseId: string; attachmentId: string };
}) {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/");
  }
  const attachment = await db.attachment.findUnique({
    where: { id: params.attachmentId },
  });
  const initialData = await db.gCPData.findUnique({
    where: { assetId: params.attachmentId },
  });
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/teacher/courses/${params.courseId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to course setup
            </Link>
            <div className="w-full">
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between align-middle">
                  <h1 className="text-2xl font-medium">Attachment Setup</h1>
                  <AttachmentActions
                    disabled={false}
                    courseId={params.courseId}
                    attachmentId={params.attachmentId}
                  />
                </div>
                <span className="text-sm text-slate-700">
                  Complete all fields
                </span>
              </div>
              <AttachmentTitleForm
                initialData={attachment}
                isDeleting={false}
              />
              <AttachmentForm
                initialData={initialData}
                courseId={params.courseId}
                attachmentId={params.attachmentId}
                isDeleting={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

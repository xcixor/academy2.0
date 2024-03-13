import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import UploadReviewDocumentForm from "@/components/dashboard/clients/docs/UploadReviewDocumentForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async ({
  params,
}: {
  params: { reviewId: string; docId: string };
}) => {
  const gcpData = await getLatestFileMetaData(params.docId);

  return (
    <div className="p-12">
      <div className="flex justify-between align-middle">
        <Link
          href={`/dashboard/document-review/${params.reviewId}`}
          className="flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>
      <UploadReviewDocumentForm
        assetId={params.docId}
        isDeleting={false}
        reviewId={params.reviewId}
        initialData={gcpData}
      />
    </div>
  );
};

export default page;

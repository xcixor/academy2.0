import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import UploadReviewDocumentForm from "@/components/dashboard/clients/docs/UploadReviewDocumentForm";
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

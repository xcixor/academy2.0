import { getCoaches } from "@/actions/get-coaches";
import { getDocumentReviewDocuments } from "@/actions/get-document-review-documents";
import { getReview } from "@/actions/get-review";
import CreateDocumentReviewDocument from "@/components/dashboard/clients/docs/CreateDocumentReviewDocument";
import DocumentReviewDocumentPreview from "@/components/dashboard/clients/docs/DocumentReviewDocumentPreview";
import EditReviewForm from "@/components/dashboard/clients/docs/EditReviewDetailsForm";
import ReviewDocumentForm from "@/components/dashboard/clients/docs/ReviewDocumentForm";
import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { reviewId: string } }) => {
  const user = await getLoggedInUser();
  if (!user) {
    return redirect("/");
  }
  const review = await getReview(params.reviewId);
  const coaches = await getCoaches();
  const comboItems = coaches.map((coach) => ({
    label: coach.email,
    value: coach.id,
  }));
  const reviewingCoach = coaches.filter((coach) => coach.id === review.coachId);
  const documentReviewDocuments = await getDocumentReviewDocuments(
    params.reviewId,
  );

  return (
    <div className="p-12">
      <h1 className="my-4 text-lg font-bold">Step 2: Upload Documents.</h1>
      <EditReviewForm
        initialData={{
          title: review.title,
          purpose: review.purpose,
          coachId: review.coachId,
          coaches: comboItems,
        }}
        reviewId={params.reviewId}
        reviewingCoach={reviewingCoach[0]}
      />

      {/* <ReviewDocumentForm
        reviewId={review.id}
        isDeleting={false}
        attachmentId={review.id}
      /> */}
      <div>
        {documentReviewDocuments.map((document) => (
          <div key={document.id}>
            <DocumentReviewDocumentPreview
              assetId={document.id}
              title={document.title}
              reviewId={review.id}
            />
          </div>
        ))}
      </div>
      <CreateDocumentReviewDocument
        initialData={{
          title: "",
        }}
        reviewId={review.id}
        isDeleting={false}
      />
    </div>
  );
};

export default page;

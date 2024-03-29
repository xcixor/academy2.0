import { getCoaches } from "@/actions/get-coaches";
import { getDocumentReviewDocuments } from "@/actions/get-document-review-documents";
import { getReview } from "@/actions/get-review";
import CreateDocumentReviewDocument from "@/components/dashboard/clients/docs/CreateDocumentReviewDocument";
import DocumentReviewDocumentPreview from "@/components/dashboard/clients/docs/DocumentReviewDocumentPreview";
import EditReviewForm from "@/components/dashboard/clients/docs/EditReviewDetailsForm";
import { getLoggedInUser } from "@/lib/auth/utils";
import { ArrowLeft, Eye } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import PreviousReview from "@/components/dashboard/teacher/document-review/PreviousReview";
import { getReviewReviews } from "@/actions/get-review-reviews";

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

  const previousReviews = await getReviewReviews(review.id);
  const hasReviews = previousReviews.length >= 1;

  return (
    <div className="p-12">
      <div className="flex justify-between align-middle">
        <Link
          href="/dashboard/document-review"
          className="flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>
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
        isOwnerComponent={true}
        isCoachComponent={false}
      />

      <CreateDocumentReviewDocument
        initialData={{
          title: "",
        }}
        reviewId={review.id}
        isDeleting={false}
      />

      <div>
        {documentReviewDocuments.map((document) => (
          <div key={document.id}>
            <DocumentReviewDocumentPreview
              assetId={document.id}
              title={document.title}
              reviewId={review.id}
              isOwnerComponent={true}
            />
          </div>
        ))}
      </div>

      {hasReviews ? (
        <div className="my-4 rounded-md border bg-slate-100 p-4">
          <h2 className="font-semibold">Previous Reviews</h2>
          {previousReviews.map((review) => (
            <div
              key={review.id}
              className="my-4 rounded-md border bg-slate-200 p-4"
            >
              <PreviousReview review={review} />
            </div>
          ))}
        </div>
      ) : (
        <p className="my-4 rounded-md border bg-slate-100 p-4">
          No reviews yet.
        </p>
      )}
    </div>
  );
};

export default page;

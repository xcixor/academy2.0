import { getCoaches } from "@/actions/get-coaches";
import { getDocumentReviewDocuments } from "@/actions/get-document-review-documents";
import { getReview } from "@/actions/get-review";
import DocumentReviewDocumentPreview from "@/components/dashboard/clients/docs/DocumentReviewDocumentPreview";
import EditReviewForm from "@/components/dashboard/clients/docs/EditReviewDetailsForm";
import { getLoggedInUser } from "@/lib/auth/utils";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import DocumentReviewForm from "@/components/dashboard/teacher/document-review/DocumentReviewForm";
import { getReviewReviews } from "@/actions/get-review-reviews";
import PreviousReview from "@/components/dashboard/teacher/document-review/PreviousReview";
import CommentForm from "@/components/dashboard/teacher/document-review/Comment";

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
          href="/dashboard/teacher/document-review"
          className="flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <EditReviewForm
        initialData={{
          title: review.title,
          purpose: review.purpose,
          coachId: review.coachId,
          coaches: comboItems,
        }}
        reviewId={params.reviewId}
        reviewingCoach={reviewingCoach[0]}
        isOwnerComponent={false}
        isCoachComponent={true}
      />

      <div>
        {documentReviewDocuments.map((document) => (
          <div key={document.id}>
            <DocumentReviewDocumentPreview
              assetId={document.id}
              title={document.title}
              reviewId={review.id}
              isOwnerComponent={false}
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
          You have not submitted any reviews yet.
        </p>
      )}

      <DocumentReviewForm
        documentReviewId={params.reviewId}
        initialData={{
          review: "",
        }}
        hasReviews={hasReviews}
      />
      <CommentForm
        initialData={{
          comment: "",
        }}
        reviewId={review.id}
        isDeleting={false}
      />
    </div>
  );
};

export default page;

import { getCoaches } from "@/actions/get-coaches";
import { getReview } from "@/actions/get-review";
import EditReviewForm from "@/components/dashboard/clients/docs/EditReviewDetailsForm";
import RequestReviewForm from "@/components/dashboard/clients/docs/RequestReviewForm";
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
    </div>
  );
};

export default page;

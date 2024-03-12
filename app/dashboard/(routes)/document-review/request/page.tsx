import { getCoaches } from "@/actions/get-coaches";
import RequestReviewForm from "@/components/dashboard/clients/docs/RequestReviewForm";
import { getLoggedInUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/");
  }
  const coaches = await getCoaches();
  const comboItems = coaches.map((coach) => ({
    label: coach.email,
    value: coach.id,
  }));
  return (
    <div className="p-12">
      <h1 className="my-4 text-lg font-bold">
        Step 1: Document review details.
      </h1>
      <RequestReviewForm
        initialData={{
          coach: "",
          coaches: comboItems,
          title: "",
          purpose: "",
        }}
        userId={user.id}
      />
    </div>
  );
};

export default page;

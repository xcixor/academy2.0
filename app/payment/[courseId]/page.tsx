import { PaymentForm } from "@/components/paypal/PaymentForm";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

interface Params {
  params: {
    courseId: string;
  };
}

const getCreds = async () => {
  const response = await fetch(
    "http://127.0.0.1:3000/api/payments/paypal/token/",
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  const { token } = data;

  return {
    clientToken: token,
    clientID: env.PAYPAL_CLIENT_ID,
  };
};

export default async function page({ params }: Params) {
  const creds = await getCreds();
  const { clientToken, clientID } = creds;
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  return (
    <>
      {creds ? (
        <PaymentForm
          clientToken={clientToken}
          clientID={clientID}
          courseId={params.courseId}
          courseTitle={course.title}
          courseDescription={course.description}
        />
      ) : (
        <p>No creds</p>
      )}
    </>
  );
}

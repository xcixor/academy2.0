import { PaymentForm } from "@/components/paypal/PaymentForm";
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

  return (
    <>
      {creds ? (
        <PaymentForm
          clientToken={clientToken}
          clientID={clientID}
          courseId={params.courseId}
        />
      ) : (
        <p>No creds</p>
      )}

    </>
  );
}

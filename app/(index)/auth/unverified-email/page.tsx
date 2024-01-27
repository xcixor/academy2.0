import ResendEmail from "@/components/auth/ResendEmail";
import { MailWarning } from "lucide-react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type Props = {
  searchParams: Record<"u", string>;
};

const page = async (props: Props) => {
  const userId = props.searchParams.u;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return notFound();
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <MailWarning className="h-16 w-16 text-red-400" />
        <h2 className="text-2xl font-bold text-primary">
          Verify your email address
        </h2>
        <p className="text-center text-primary">
          We noticed your email address has not been verified. <br />
          We have sent a verification link to your inbox <br />
          Click on the link to complete the verification process. <br />
          You might need to check your spam folder if you can&apos;t see it or
          <br />
          click the resend button below.
        </p>
        <ResendEmail toEmail={user.email} />
      </div>
    </div>
  );
};

export default page;

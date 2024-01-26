import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import { UserCog2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Unlock a world of knowledge at PES Academy. Sign up today for transformative courses and take the first step toward mastering private equity.",
  alternates: {
    canonical: 'https://academy.privateequity-support.com/auth/sign-up',
  },
};

const page = () => {
  return (
    <div className="grainy">
      <MaxWidthWrapper className="w-full gap-4 rounded-md md:flex">
        <div className="basis-1/2 py-16">
          <Signup />
        </div>
        <div className="flex basis-1/2 flex-col items-center justify-center gap-4 bg-sky-50 py-16">
          <Logo />
          <div className="flex items-center gap-2">
            <UserCog2 className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <p className="text-center">
            Join hundreds of students taking their business <br /> knowledge to
            the next level
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;

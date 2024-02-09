"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { signIn } from "next-auth/react";

const CTA = () => {
  return (
    <section className="bg-secondary py-32">
      <MaxWidthWrapper className="flex">
        <div className="basis-1/2">
          <h2 className="text-2xl  uppercase text-pes-red">
            Are you ready to start learning?
          </h2>
          <p>
            Join us on this transformative educational experience where expertise meets innovation.
          </p>
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <Link href="/dashboard/teacher/courses">
            <Button
              onClick={() => signIn()}
              size="sm"
              variant="secondary"
              className="h-auto bg-red-800 py-2 text-white"
            >
              Start Now!
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CTA;

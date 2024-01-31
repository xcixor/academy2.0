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
          <h2 className="text-2xl  uppercase text-red-800">
            Are you ready to start learning?
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit quos esse molestias error sapiente, dolorum unde
            accusamus magnam libero hic.
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

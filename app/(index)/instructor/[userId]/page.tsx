import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChevronLeft, ChevronRight, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet the experts shaping your journey at PES Academy. Explore our distinguished instructors, each a leader in their respective fields. EMMANUEL MUDAHEMUKA, Esther Kahuko, Charity Kirima",
  alternates: {
    canonical:
      "https://academy.privateequity-support.com/instructor/instructor.id",
  },
};

const page = async ({ params }: { params: { userId: string } }) => {
  const instructor = await db.user.findFirst({
    where: {
      id: params.userId,
    },
    include: {
      profile: true,
    },
  });
  if (!instructor) {
    return notFound();
  }
  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex flex-col justify-start gap-8 md:flex-row">
        <div className="basis-1/3">
          <Image
            src={instructor.image || "/index/male_student.jpg"}
            alt={instructor.profile.firstName}
            height={200}
            width={200}
            className="h-auto w-full self-start rounded-sm"
          />
        </div>
        <div className="flex basis-2/3 flex-col justify-center gap-2">
          <h2 className="text-2xl font-semibold uppercase">
            Meet {instructor.profile.firstName}&nbsp;
            {instructor.profile.lastName}
          </h2>
          <Link
            href={instructor.profile.linkedIn || "#"}
            className="flex items-center hover:text-pes-red"
          >
            <LinkedinIcon className="me-4 h-4 w-4 text-pes-blue" />
            LinkedIn Profile
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p>{instructor.profile.bio || "No bio available"}</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

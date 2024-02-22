import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

const Instructors = async () => {
  const instructors = await db.user.findMany({
    where: {
      role: Role.COACH,
    },
    include: {
      profile: true,
    },
  });
  return (
    <section className="bg-secondary py-32">
      <MaxWidthWrapper><h2 className="my-8 text-center text-5xl font-semibold text-pes-red" data-scroll data-scroll-speed="0.05">Our Coaches</h2>
        <div className="grid-cols-1 gap-4 md:grid md:grid-cols-2">
          {instructors.map((instructor) => (
            <Link key={instructor.id} href={`/instructor/${"instructor.id"}`}>
              <div className="flex flex-col-reverse">
                <div className="basis-2/3 ">
                  <div className="flex">
                    <div className="space-y-8 p-8 ">
                      <div className="relative">
                        <h3 className="text-2xl font-semibold text-pes-red">
                          {instructor.profile.firstName}&nbsp;
                          {instructor.profile.lastName}
                        </h3>
                        <h4 className="text-lg font-semibold text-pes-blue">
                          {instructor.profile.jobTitle || "No title available"}
                        </h4>
                      </div>
                      <p className="line-clamp-3 text-pes-blue">
                        {instructor.profile.bio || "No bio available"}
                      </p>
                      <Link
                        key={instructor.id}
                        href={`/instructor/${instructor.id}`}
                        className="flex items-center"
                      >
                        More
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                <Image
                  src={instructor.image || "/index/male_student.jpg"}
                  alt={instructor.profile.firstName}
                  height={200}
                  width={200}
                  className="h-auto w-full basis-1/3 rounded-sm"
                />
              </div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Instructors;
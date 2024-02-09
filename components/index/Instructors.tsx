import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const instructors = [
  {
    id: "434kdfg943",
    name: "Coach Name",
    jobTitle: "Job Title",
    imageUrl: "/index/female_student.jpg",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ex numquam quis hic ratione vero laborum doloribus non ullam dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius itaque rem aliquid at abovelit doloribus laborum accusantium esse.",
  },
  {
    id: "434kdfg943",
    name: "Coach Name",
    jobTitle: "Job Title",
    imageUrl: "/index/male_student.jpg",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ex numquam quis hic ratione vero laborum doloribus non ullam dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius itaque rem aliquid at abovelit doloribus laborum accusantium esse.",
  },
];

const Instructors = () => {
  return (
    <section className="bg-secondary py-32">
      <MaxWidthWrapper>
        <h2 className="my-8 text-center text-3xl font-semibold text-pes-red">Our Coaches</h2>
        <div className="grid-cols-1 gap-4 md:grid md:grid-cols-2">
          {instructors.map((instructor) => (
            <Link key={instructor.id} href={`/instructor/${"instructor.id"}`}>
              <div className="flex flex-col-reverse">
                <div className="basis-2/3 ">
                  <div className="flex">
                    <div className="space-y-8 p-8 ">
                      <div className="relative">
                        <h3 className="text-2xl font-semibold ">
                          {instructor.name}
                        </h3>
                        <h4 className="text-lg font-semibold text-zinc-500">
                          {instructor.jobTitle}
                        </h4>
                      </div>
                      <p className="line-clamp-3">{instructor.bio}</p>
                      <Link
                        key={instructor.id}
                        href={`/instructor/${"instructor.id"}`}
                        className="flex items-center"
                      >
                        More
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                <Image
                  src={instructor.imageUrl}
                  alt="Male Student"
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

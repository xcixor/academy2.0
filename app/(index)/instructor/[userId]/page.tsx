import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChevronLeft, ChevronRight, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Instructors",
  description: "Meet the experts shaping your journey at PES Academy. Explore our distinguished instructors, each a leader in their respective fields. EMMANUEL MUDAHEMUKA, Esther Kahuko, Charity Kirima",
  alternates: {
    canonical: 'https://academy.privateequity-support.com/instructor/instructor.id',
  },
};

type Props = {};

const page = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex flex-col justify-start gap-8 md:flex-row">
        <div className="basis-1/3">
          <Image
            src="/index/male_student.jpg"
            alt="Male Student"
            height={200}
            width={200}
            className="h-auto w-full self-start rounded-sm"
          />
        </div>
        <div className="flex basis-2/3 flex-col justify-center gap-2">
          <h2 className="text-2xl font-semibold uppercase">
            Meet Emmanuel Mudahemuka
          </h2>
          <Link href="#" className="flex items-center hover:text-zinc-600">
            <LinkedinIcon className="me-4 h-4 w-4 text-pes-blue" />
            LinkedIn Profile
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos illo
            ratione laudantium veniam. Voluptates, saepe amet? Accusamus eos
            tempora quisquam odit placeat. Labore voluptatem quasi fugiat
            consectetur eligendi expedita. Ipsa nam consectetur assumenda sint
            quia velit impedit, placeat quisquam expedita corporis veritatis,
            consequatur vel dolorem minima quod accusantium vero unde dicta
            possimus quos dolorum sit. Aliquid delectus nisi non sunt
            dignissimos facere vitae nihil pariatur reiciendis blanditiis alias
            reprehenderit atque nobis repudiandae ex asperiores incidunt ad
            impedit, vero dolore, quasi quod! In error nostrum pariatur, eum est
            iure asperiores fuga, fugit reiciendis laboriosam enim voluptas
            labore ducimus repellendus incidunt placeat ullam modi aspernatur
            et! Adipisci nihil in accusamus id vel itaque aliquid iure
            voluptatem voluptas nisi natus porro placeat est cum fugit expedita
            delectus temporibus, nemo unde quisquam aperiam. Itaque eos corrupti
            deserunt, nisi eveniet pariatur deleniti recusandae quis dolorem
            sequi incidunt omnis odio velit. Aspernatur, mollitia? Voluptatem
            assumenda impedit at. Nemo laborum aliquid, illo numquam facere
            dicta adipisci earum eaque recusandae quidem molestiae et officia
            soluta commodi voluptas error minus maiores facilis ipsum
            necessitatibus laudantium aperiam quis. Hic corrupti id quas,
            nostrum cum voluptatem? Libero voluptatum illum odit laborum error,
            possimus in labore quos, reprehenderit consequuntur aspernatur
            architecto quia!
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

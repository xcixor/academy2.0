import Link from "next/link";
import CourseCard from "../CourseCard";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ChevronRight } from "lucide-react";
import { getComingSoonCourses } from "@/actions/get-coming-soon-courses";
import { CourseWithProgressWithCategory } from "@/@types/db";

const ComingSoon = async () => {
  let items =
    (await getComingSoonCourses()) as CourseWithProgressWithCategory[];
  items = items.slice(0, 4);

  return (
    <MaxWidthWrapper className="py-32">
      <div className="flex items-center justify-between">
        <h2
          className="mb-10 text-center text-5xl font-semibold text-pes-red"
          data-scroll
          data-scroll-speed="0.05"
        >
          Coming Soon
        </h2>
        <Link href="/browse" className="flex items-center text-pes-red">
          More <ChevronRight className="h-6 w-6" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            chaptersLength={item.chapters.length}
            progress={item.progress}
            category={item?.category?.name}
            price={item.price}
            isFree={item.isFree}
          />
        ))}
      </div>
      <div>
        {items.length === 0 && (
          <div className="mt-10">
            <p className=" text-sm text-muted-foreground">
              We are updating our library.
            </p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default ComingSoon;

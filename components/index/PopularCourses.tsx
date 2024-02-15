import Link from "next/link";
import CourseCard from "../CourseCard";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ChevronRight } from "lucide-react";
import { getPopularCourses } from "@/actions/get-popular-courses";
import { CourseWithProgressWithCategory } from "@/@types/db";

const PopularCourses = async () => {
  const items = (await getPopularCourses()) as CourseWithProgressWithCategory[];
  return (
    <section className="py-32">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <h2 className="text-center text-3xl font-semibold text-red-800">
            Popular Courses
          </h2>
          <Link href="/browse" className="flex items-center">
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
    </section>
  );
};

export default PopularCourses;

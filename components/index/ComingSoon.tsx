import Link from "next/link";
import CourseCard from "../CourseCard";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ChevronRight } from "lucide-react";

const popularCourses = [
  {
    id: "02f7f6d6-367d-4c98-97cf-0452aa85eba7",
    title: "Marketing",
    imageUrl: "/index/female_student.jpg",
    chaptersLength: 3,
    price: 12000,
    category: "Marketing",
  },
  {
    id: "02f7f6d6-367d-4c98-97cf-0452aa85eba7",
    title: "Advanced Business",
    imageUrl: "/index/male_student.jpg",
    chaptersLength: 3,
    price: 15000,
    category: "Marketing",
  },
  {
    id: "02f7f6d6-367d-4c98-97cf-0452aa85eba7",
    title: "AI in Business",
    imageUrl: "/index/female_student.jpg",
    chaptersLength: 3,
    price: 21000,
    category: "Technology",
  },
  {
    id: "02f7f6d6-367d-4c98-97cf-0452aa85eba7",
    title: "Social Media Marketing",
    imageUrl: "/carousel/photo-2.avif",
    chaptersLength: 3,
    price: 21000,
    category: "Technology",
  },
];

const ComingSoon = () => {
  return (
    <MaxWidthWrapper className="py-32">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-semibold text-pes-red mb-10" data-scroll data-scroll-speed="0.05">Coming Soon</h2>
        <Link href="/browse" className="flex items-center text-pes-red">
          More <ChevronRight className="h-6 w-6" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {popularCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl}
            chaptersLength={course.chaptersLength}
            price={course.price}
            category={course.category}
          />
        ))}
      </div>
      <div>
        {popularCourses.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No courses found
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default ComingSoon;

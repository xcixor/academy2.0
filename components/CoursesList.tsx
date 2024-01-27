import { Category, Course } from "@prisma/client";

import CourseCard from "@/components/CourseCard";
import { getAllCourses } from "@/actions/get-all-courses";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress?: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

interface PageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export default async function CoursesList({ searchParams }: PageProps) {
  const items = (await getAllCourses({
    ...searchParams,
  })) as CourseWithProgressWithCategory[];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
}

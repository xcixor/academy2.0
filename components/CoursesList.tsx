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
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
}

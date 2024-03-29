import CourseCard from "@/components/CourseCard";
import { CourseWithProgressWithCategory } from "@/@types/db";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export default async function CoursesList({ items }: CoursesListProps) {
  return (
    <div className="bg-secondary">
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
      {items.length === 0 && (
        <div className="mt-10 bg-secondary text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
}
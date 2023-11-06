import { db } from "@/lib/db";
import { SearchInput } from "@/components/SearchInput";

import CoursesList from "@/components/CoursesList";

import Categories from "../../../components/browse/Categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList searchParams={searchParams} />
      </div>
    </>
  );
};

export default SearchPage;

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
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <CoursesList searchParams={searchParams} />
      </div>
    </>
  );
};

export default SearchPage;

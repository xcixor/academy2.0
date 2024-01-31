import type { Metadata } from "next";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/SearchInput";

import CoursesList from "@/components/CoursesList";

import Categories from "../../../components/browse/Categories";
import { CourseWithProgressWithCategory } from "@/@types/db";
import { getAllCourses } from "@/actions/get-all-courses";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export const metadata: Metadata = {
  title: "Browse Courses",
  description: "Explore, Learn, Succeed. Discover transformative courses at PES Academy – Shaping the Future of Private Equity Education.",
  alternates: {
    canonical: 'https://academy.privateequity-support.com/browse',
  },
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const items = (await getAllCourses({
    ...searchParams,
  })) as CourseWithProgressWithCategory[];

  return (
    <>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <CoursesList items={items} />
      </div>
    </>
  );
};

export default SearchPage;

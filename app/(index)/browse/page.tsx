import type { Metadata } from "next";
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

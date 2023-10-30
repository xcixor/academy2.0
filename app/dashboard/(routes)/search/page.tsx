import SearchPageSkeleton from "./_components/SearchPageSkeleton";
import dynamic from "next/dynamic";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPageWithLoading = dynamic(() => import("./SearchPage"), {
  loading: () => <SearchPageSkeleton />,
});

export default function Page({ searchParams }: SearchPageProps) {
  return <SearchPageWithLoading searchParams={searchParams} />;
}

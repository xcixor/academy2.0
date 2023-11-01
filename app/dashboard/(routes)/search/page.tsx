import SearchPageSkeleton from "../../../../components/dashboard/search/SearchPageSkeleton";
import dynamic from "next/dynamic";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPageWithLoading = dynamic(
  () => import("../../../../components/dashboard/search/SearchPage"),
  {
    loading: () => <SearchPageSkeleton />,
  }
);

export default function Page({ searchParams }: SearchPageProps) {
  return <SearchPageWithLoading searchParams={searchParams} />;
}

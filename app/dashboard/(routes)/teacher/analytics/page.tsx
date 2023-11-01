import dynamic from "next/dynamic";
import AnalyticsPageSkeleton from "@/components/dashboard/teacher/analytics/AnalyticsPageSkeleton";

const SearchPageWithLoading = dynamic(
  () =>
    import(
      "../../../../../components/dashboard/teacher/analytics/AnalyticsPage"
    ),
  {
    loading: () => <AnalyticsPageSkeleton />,
  }
);

export default function page() {
  return <SearchPageWithLoading />;
}

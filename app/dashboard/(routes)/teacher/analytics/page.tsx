import dynamic from "next/dynamic";
import AnalyticsPageSkeleton from "./_components/AnalyticsPageSkeleton";

const SearchPageWithLoading = dynamic(() => import("./AnalyticsPage"), {
  loading: () => <AnalyticsPageSkeleton />,
});

export default function page() {
  return <SearchPageWithLoading/>;
}

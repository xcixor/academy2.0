import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSkeleton from "@/components/dashboard/root/DashboardSkeleton";
import dynamic from "next/dynamic";

const DashboardPageCustomLoading = dynamic(
  () => import("@/components/dashboard/root/DashboardPageWrapper"),
  {
    loading: () => <DashboardSkeleton />,
  }
);

export default function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  return <DashboardPageCustomLoading userId={userId} />;
}

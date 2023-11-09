import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import DataCard from "./DataCard";
import Chart from "./Chart";
import { getLoggedInUser } from "@/lib/auth/utils";

const AnalyticsPage = async () => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      {data.length > 0 ? <Chart data={data} /> : <p>No data here.</p>}
    </div>
  );
};

export default AnalyticsPage;

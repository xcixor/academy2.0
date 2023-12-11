import { getLoggedInUser } from "@/lib/auth/utils";

import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user || !user?.isCoach) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;

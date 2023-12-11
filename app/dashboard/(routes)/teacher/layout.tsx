import { getLoggedInUser } from "@/lib/auth/utils";
import { isTeacher } from "@/lib/teacher";

import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user || !user?.isCoach) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;

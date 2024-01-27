import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";

import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user || !(user?.role === Role.COACH)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;

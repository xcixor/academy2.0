import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import React from "react";
import User from "@/components/dashboard/admin/users/userId/User";

type Props = {
  params: {
    userId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getLoggedInUser();
  const userId = user?.userId;

  if (!userId || !user.isAdmin) {
    return redirect("/");
  }
  const userToManage = await db.user.findUnique({
    where: { id: params.userId },
  });
  if (userToManage) {
    return <User user={userToManage} />;
  }
  return <div>User not found</div>;
};

export default page;

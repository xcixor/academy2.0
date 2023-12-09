import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NotificationList from "@/components/notifications/NotificationList";
import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextApiResponse } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

const Notifications = async () => {
  const user = await getLoggedInUser();
  if (!user) {
    return notFound();
  }
  const notifications = await db.notification.findMany({
    where: {
      recepientId: user.userId,
    },
  });

  return (
    <MaxWidthWrapper className="py-4">
      <NotificationList
        userId={user?.userId}
        allNotifications={notifications}
      />
    </MaxWidthWrapper>
  );
};

export default Notifications;

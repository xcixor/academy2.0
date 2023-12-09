import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Bell, BellDot } from "lucide-react";

const Notifications = async () => {
  const user = await getLoggedInUser();
  const unReadNotifications = await db.notification.findMany({
    where: {
      isRead: false,
      recepientId: user?.userId,
    },
  });
  return (
    <>
      {unReadNotifications.length > 0 ? (
        <BellDot className="cursor-pointer text-blue-500 hover:text-blue-800" />
      ) : (
        <Bell className="cursor-pointer text-blue-500 hover:text-blue-800" />
      )}
    </>
  );
};

export default Notifications;

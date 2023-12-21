"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NotificationList from "@/components/notifications/NotificationList";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const Notifications = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  const url = `/api/notifications/${session?.user.id}/all/`;
  const { data, isLoading, error } = useSWR(url, fetcher);
  const notifications = data as Notification[] | null;

  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }
  if (notifications && notifications.length <= 0) {
    return <p>Not found</p>;
  }
  if (notifications && notifications.length > 0) {
    return (
      <MaxWidthWrapper className="py-4">
        <NotificationList
          userId={session?.user?.id}
          allNotifications={notifications}
        />
      </MaxWidthWrapper>
    );
  }
};

export default Notifications;

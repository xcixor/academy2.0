import { NOTIFICATION_TYPES } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

export const sendCourseNotifications = async (courseId: string) => {
  const dashboard_route = `/dashboard/teacher/courses/`;

  try {
    const data = {
      title: "New Arrival",
      type: NOTIFICATION_TYPES.INFO,
    };
    await axios.post(`/api/courses/${courseId}/notify-students`, data);
    toast.success("Notification sent.");
  } catch {
    toast.error("Something went wrong");
  } finally {
    location.reload();
  }
};

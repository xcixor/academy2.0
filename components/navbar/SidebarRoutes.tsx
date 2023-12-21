"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  FolderCheck,
  Users2,
  Library,
  UserCogIcon,
  GraduationCap,
  Users,
  Album,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/dashboard/search",
  },
  {
    icon: GraduationCap,
    label: "Coaches",
    href: "/dashboard/coaches",
  },
  {
    icon: UserCogIcon,
    label: "Profile",
    href: "/dashboard/profile",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard/teacher/analytics",
  },
  {
    icon: FolderCheck,
    label: "Quizzes",
    href: "/dashboard/teacher/quizzes",
  },
  {
    icon: Users,
    label: "Clients",
    href: "/dashboard/teacher/clients",
  },
  {
    icon: Album,
    label: "Sessions",
    href: "/dashboard/teacher/sessions",
  },
];

const adminRoutes = [
  {
    icon: Users2,
    label: "Users",
    href: "/dashboard/admin/users",
  },
  {
    icon: Library,
    label: "Courses",
    href: "/dashboard/admin/courses",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  const routes = isTeacherPage
    ? teacherRoutes
    : isAdminPage
      ? adminRoutes
      : guestRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

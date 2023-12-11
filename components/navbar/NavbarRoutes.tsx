"use client";
import UserButton from "./UserButton";
import { usePathname } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "../SearchInput";
import { isTeacher } from "@/lib/teacher";
import { Logo } from "../Logo";
import { SessionUser } from "@/lib/auth/utils";
import Notifications from "./Notifications";

interface Props {
  user: SessionUser | null;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();

  const userId = user?.userId;

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isAdminPage = pathname?.startsWith("/admin");
  const isUsersPage = pathname?.startsWith("/users");
  const isCoursePage = pathname?.includes("/courses");
  const isBrowsePage = pathname === "/browse";
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <>
      {!isDashboard && (
        <div className="hidden flex-1 md:block">
          <div className="flex w-full justify-between gap-x-2 align-middle">
            <Link href="/">
              <Logo />
            </Link>
            {isBrowsePage && (
              <div className="hidden md:block">
                <SearchInput />
              </div>
            )}
            <ul className="flex items-center">
              <li className="mr-4">
                <Link href="/browse">
                  <p className="cursor-pointer text-blue-500 hover:text-blue-800">
                    Browse
                  </p>
                </Link>
              </li>
              <li className="mr-4">
                <Link href="#">
                  <p className="cursor-pointer text-blue-500 hover:text-blue-800">
                    Pricing
                  </p>
                </Link>
              </li>
              <li className="mr-4">
                <Link href="/notifications">
                  <Notifications userId={user?.id} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isBrowsePage && userId && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex items-center gap-x-2">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.isCoach ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="ghost" className="h-auto py-2">
              Teacher mode
            </Button>
          </Link>
        ) : null}

        {isAdminPage || isUsersPage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.isAdmin ? (
          <Link href="/dashboard/admin/users">
            <Button size="sm" variant="ghost" className="h-auto py-2">
              Admin mode
            </Button>
          </Link>
        ) : null}

        <UserButton user={user} />
      </div>
    </>
  );
}

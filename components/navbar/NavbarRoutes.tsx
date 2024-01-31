"use client";
import UserButton from "./UserButton";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "../SearchInput";
import { Logo } from "../Logo";
import { SessionUser } from "@/lib/auth/utils";
import Notifications from "./Notifications";
import { Role } from "@prisma/client";

interface Props {
  user: SessionUser | null;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();
  const userId = user?.id;

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");
  const isBrowsePage = pathname === "/browse";
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <>
      <div className="hidden flex-1 md:block">
        <div className="flex w-full justify-between gap-x-2 align-middle">
          <Link href="/">
            <Logo />
          </Link>
          {isBrowsePage && (
            <div className="hidden flex-1 md:mx-12 md:block">
              <SearchInput />
            </div>
          )}
          {!isDashboard && (
            <ul className="flex items-center">
              <li className="mr-4">
                <Link href="/browse">
                  <p className="cursor-pointer text-blue-500 hover:text-blue-800">
                    Browse
                  </p>
                </Link>
              </li>
              <li className="mr-4">
                <Link href="/notifications">
                  <Notifications userId={user?.id} />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2 ">
        {user?.role === Role.COACH && isTeacherPage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.COACH ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Teacher mode
            </Button>
          </Link>
        ) : null}

        {user?.role === Role.ADMIN && isAdminPage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.ADMIN ? (
          <Link href="/dashboard/admin/users">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Admin mode
            </Button>
          </Link>
        ) : null}

        <UserButton user={user} />
      </div>
    </>
  );
}

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

interface Props {
  user: SessionUser | null;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();

  const userId = user?.userId;

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isBrowsePage = pathname === "/browse";
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <>
      {!isDashboard && (
        <div className="hidden md:block flex-1">
          <div className="w-full flex align-middle justify-between gap-x-2">
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
                  <p className="text-blue-500 hover:text-blue-800 cursor-pointer">
                    Browse
                  </p>
                </Link>
              </li>
              <li className="mr-4">
                <Link href="#">
                  <p className="text-blue-500 hover:text-blue-800 cursor-pointer">
                    Pricing
                  </p>
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
      <div className="flex gap-x-2 ml-auto items-center">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="ghost" className="h-auto py-2">
              Teacher mode
            </Button>
          </Link>
        ) : null}

        <UserButton user={user} />
      </div>
    </>
  );
}

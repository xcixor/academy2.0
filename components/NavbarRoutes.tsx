"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./SearchInput";
import { isTeacher } from "@/lib/teacher";
import { Logo } from "./Logo";

export default function NavbarRoutes() {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {!userId && (
        <div className="hidden md:block w-full">
          <div className="w-full flex align-middle justify-between gap-x-2">
            <Link href="/">
              <Logo />
            </Link>
            {isSearchPage && (
              <div className="hidden md:block">
                <SearchInput />
              </div>
            )}
            <ul className="flex items-center">
              <li className="mr-4">
                <Link href="/search">
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
              <li className="mr-4">
                {!userId && (
                  <Link href="/sign-in">
                    <Button size="sm" variant="default">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      {isSearchPage && userId && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}

"use client";

import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { SessionUser } from "@/lib/auth/utils";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogIn, LogOut, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserMenuButtonProps {
  user: SessionUser | null;
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center">
              <Image
                src={user?.image || profilePicPlaceholder}
                alt="Profile picture"
                width={40}
                height={40}
                className="w-10 rounded-full"
              />
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard">Profile</Link>
            </DropdownMenuItem>
            <Button
              size="sm"
              variant="default"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" variant="default" onClick={() => signIn()}>
          <LogIn className="h-4 w-4 mr-2" /> LogIn
        </Button>
      )}
    </>
  );
}

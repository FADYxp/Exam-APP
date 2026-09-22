"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { CircleUserRound, Lock, LogOut } from "lucide-react";

export default function AccountSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-4 font-geist lg:absolute lg:inset-x-6 lg:bottom-6 lg:start-[23.965rem] lg:top-44 lg:flex-row lg:gap-6">
      <nav className="flex flex-col justify-between gap-4 bg-white p-4 sm:p-6 lg:w-64 lg:shrink-0">
        <div className="flex flex-col gap-2 align-middle">
          <Link className={`flex px-3 py-2 transition-all gap-2 sm:px-4 ${
                pathName === "/account" 
                  ? "text-blue-600  bg-blue-100"
                  : "text-gray-500"
              }`} href="/account">
          <CircleUserRound />  Profile
          </Link>
          <Link className={`flex px-3 py-2 transition-all gap-2 sm:px-4 ${
                pathName === "/account/change-password" || pathName.endsWith("/change-password")
                  ? "text-blue-600   bg-blue-100"
                  : "text-gray-500"
              }`} href="/account/change-password">
           <Lock/> Change Password
          </Link>
        </div>
        <Button variant="red" className="py-0" onClick={() => signOut()}>
         <LogOut className="rotate-180"/> Log Out
        </Button>
      </nav>
      {/* content */}
    <div className="min-w-0 flex-1 bg-white p-4 sm:p-6">{children}</div>
    </div>
  );
}

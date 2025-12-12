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
    <div className="flex gap-6  absolute top-44 bottom-6 start-[23.965rem] right-6 font-geist">
      <nav className=" relative top-0 bottom-0  flex-col flex justify-between  p-6 bg-white">
        <div className="flex flex-col gap-2 align-middle">
          <Link className={`flex px-4 py-2 transition-all gap-2 ${
                pathName === "/account" 
                  ? "text-blue-600  bg-blue-100"
                  : "text-gray-500"
              }`} href="/account">
          <CircleUserRound />  Profile
          </Link>
          <Link className={`flex  px-4 py-2 transition-all gap-2 ${
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
     <div className="bg-white  flex-1 p-6 ">{children}</div> 
    </div>
  );
}

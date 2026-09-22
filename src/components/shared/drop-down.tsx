"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="p-2 rounded-md outline-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
        <EllipsisVertical className="w-5 h-5 text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={15}
        className="w-48 z-[60] shadow-lg dark:bg-slate-800"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="flex items-center gap-2 cursor-pointer w-full p-2"
          >
            <UserRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 text-red-600 cursor-pointer w-full p-2 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/50 dark:text-red-400 dark:focus:text-red-300"
        >
          <LogOut className="w-4 h-4 rotate-180" />
          <span className="font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

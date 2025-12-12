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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="-translate-y-4 -translate-x-3"
        align="end"
      >
        <DropdownMenuItem>
          <Link
            href="/account"
            className="flex items-center gap-1 border-b-gray-100 w-full"
          >
            <UserRound className="text-gray-500" /> Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <p
            onClick={() => {
              signOut();
            }}
            className="flex items-center gap-1 text-red-600 w-full"
          >
            <LogOut className="rotate-180" /> Logout
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav className="p-4 w-full bg-white flex flex-wrap items-center gap-2 text-sm text-gray-400">
      {/* Home link */}
      <Link href="/" className="">
        Home
      </Link>

      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        const name = segment;

        return (
          <span key={idx} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            <Link
              href={href}
              className={
                isLast
                  ? "text-blue-600 capitalize"
                  : "hover:text-blue-600 capitalize"
              }
            >
              {name}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

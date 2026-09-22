"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

const formatSegment = (segment: string): string => {
  return decodeURIComponent(segment)
    .replace(/%20/g, "-")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diplomaTitle = searchParams.get("diplomaTitle");
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex w-full min-w-0 flex-wrap items-center gap-2 bg-white p-3 text-xs text-gray-400 sm:p-4 sm:text-sm">
      {/* Home link */}
      <Link href="/" className="hover:text-blue-600">
        Home
      </Link>

      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        
        // Preserve search params when navigating
        const hrefWithParams = diplomaTitle && idx <= 0 
          ? `${href}?diplomaId=${searchParams.get("diplomaId")}&diplomaTitle=${diplomaTitle}`
          : href;
        
        // Determine display name
        let displayName = formatSegment(segment);
        
        // Replace "exams" with diplomaTitle
        if (segment === "exams" && diplomaTitle) {
          displayName = diplomaTitle;
        }
        // Replace with formatted exam title if it's the last segment and not "exams"
        else if (isLast && segment !== "exams") {
          displayName = formatSegment(segment);
        }

        return (
          <span key={idx} className="flex min-w-0 items-center gap-2">
            <span className="text-gray-300">/</span>
            <Link
              href={hrefWithParams}
              className={
                isLast
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              <span className="max-w-[14rem] truncate sm:max-w-none">{displayName}</span>
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

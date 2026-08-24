"use client";
import React from "react";
import Link from "next/link";
import { GraduationCap, Moon, Sun, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import userimg from "./../../../../../../public/assets/user.jpg";
import logo from "./../../../../../../public/assets/logo.png";

import ExamAppIcon from "@/components/shared/exam-app-icon";
import DropdownMenuDemo from "@/components/shared/drop-down";
import MainHeader from "../../dashboard-header";
import Loader from "@/components/shared/loader";
import { useTheme } from "@/components/providers/_components/theme-provider";

export default function SidebarWithNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Sidebar */}
      <nav className="fixed top-0 bg-blue-50 dark:bg-sidebar left-0 h-full w-[22.625rem] flex flex-col p-10">
        <div className="flex flex-col gap-2 mb-16">
          <Image
            src={logo}
            alt="Elevate"
            className="logo"
            width={192}
            height={37}
          />
          <ExamAppIcon />
        </div>

        <div className="flex flex-col justify-between h-full">
          {/* TOP SECTION: Navigation Links */}
          <div className="flex flex-col">
            {/* DASHBOARD */}
            <Link
              href={"/"}
              className={`flex items-center p-4 transition-all rounded-lg mb-2 ${
                pathname === "/" || pathname.startsWith("/exams")
                  ? "text-blue-600 border border-blue-600 bg-blue-100/50"
                  : "text-gray-500 dark:text-sidebar-foreground hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <GraduationCap />
                <span>Dashboard</span>
              </span>
            </Link>

            {/* ACCOUNT SETTINGS */}
            <Link
              href={"/account"}
              className={`flex items-center p-4 transition-all rounded-lg ${
                pathname.startsWith("/account")
                  ? "text-blue-600 border border-blue-600 bg-blue-100/50"
                  : "text-gray-500 dark:text-sidebar-foreground hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <UserRound />
                <span>Account Settings</span>
              </span>
            </Link>
          </div>

          {/* BOTTOM SECTION: Theme Toggle & Profile */}
          <div className="flex flex-col gap-6 mt-auto">
            
            {/* THEME TOGGLE BUTTON (Modern Premium Design) */}
            <button
              onClick={toggleTheme}
              className="group relative flex w-full items-center justify-between rounded-2xl bg-white p-2 pr-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] ring-1 ring-gray-100 transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.97] dark:bg-[#1e293b] dark:ring-gray-800 dark:hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.4)]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-slate-700">
                  <Sun
                    className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
                      theme === "dark"
                        ? "scale-0 -rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                    }`}
                  />
                  <Moon
                    className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
                      theme === "dark"
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 rotate-90 opacity-0"
                    }`}
                  />
                </div>
                {/* Text */}
                <span className="font-semibold text-gray-700 transition-colors dark:text-gray-200">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
              </div>

              {/* Glowing Dot Indicator */}
              <div className="flex items-center justify-center">
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-150 ${
                    theme === "dark"
                      ? "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                      : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                  }`}
                />
              </div>
            </button>

            {/* USER PROFILE SECTION */}
            {status === "loading" ? (
              <Loader />
            ) : (
              <div className="flex items-center gap-3 pt-2">
                <Image
                  src={userimg}
                  alt="profile picture"
                  className="border-2 border-blue-600 w-12 h-12 object-cover rounded-full shadow-sm"
                  width={54}
                  height={54}
                />
                <div className="flex flex-col">
                  <span className="text-blue-600 font-bold text-sm">
                    {session?.user?.firstName || "User"}
                  </span>
                  <span className="text-gray-500 text-xs font-medium dark:text-gray-400">
                    {session?.user?.email || "user@example.com"}
                  </span>
                </div>
                <div className="ms-auto">
                  <DropdownMenuDemo />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Content wrapper */}
      <div className="ms-[22.625rem] flex flex-col min-h-screen">
        <Navbar />
        <MainHeader />
        <div className="flex-col flex-1 p-6">{children}</div>
      </div>
    </>
  );
}
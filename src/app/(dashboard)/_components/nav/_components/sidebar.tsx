"use client";
import React from "react";
import Link from "next/link";
import { GraduationCap, UserRound } from "lucide-react";
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
export default function SidebarWithNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();



  return (
    <>
      {/* Sidebar */}
      <nav className="fixed top-0 bg-blue-50 left-0 h-full w-[22.625rem] flex flex-col p-10">
        <div className=" flex flex-col gap-2 mb-16">
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
          <div className="flex flex-col">


            {/* DASHBOARD */}
            <Link
              href={"/"}
              className={`flex items-center p-4 transition-all ${
                pathname === "/" || pathname.startsWith("/exams")
                  ? "text-blue-600 border border-blue-600 bg-blue-100"
                  : "text-gray-500"
              }`}
            >
              <span className="flex items-center gap-2">
                <GraduationCap />
                <span>Dashboard</span>
              </span>
            </Link>

            {/* ACCOUNT SETTINGS  */}
            <Link
              href={"/account"}
              className={`flex items-center p-4 transition-all ${
                pathname.startsWith("/account")
                  ? "text-blue-600 border border-blue-600 bg-blue-100"
                  : "text-gray-500"
              }`}
            >
              <span className="flex items-center gap-2">
                <UserRound />
                <span>Account Settings</span>
              </span>
            </Link>
          </div>
          {status === "loading" ? (
            <Loader/>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={userimg}
                alt="profile picture"
                className="border border-blue-600 w-12 h-12 object-cover "
                width={54}
                height={54}
              />
              <div className="flex flex-col">
                <span className="text-blue-600">
                  {session?.user?.firstName}
                </span>
                <span className="text-gray-500 text-sm">
                  {session?.user?.email}
                </span>
              </div>
              <div className="ms-auto">
                <DropdownMenuDemo />
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Content wrapper */}
      <div className="ms-[22.625rem] flex flex-col min-h-screen">
        <Navbar />
        <MainHeader />

        <div className="flex-col flex-1 p-6 "> {children}</div>
      </div>
    </>
  );
}

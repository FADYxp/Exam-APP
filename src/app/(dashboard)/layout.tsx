import React from "react";
import { Inter } from "next/font/google";
import Navbar from "./_components/nav/_components/sidebar";


export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50  w-full min-h-screen ">
      <Navbar>{children}</Navbar>
    </div>
  );
}

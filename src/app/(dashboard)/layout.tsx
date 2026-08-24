import React from "react";
import Navbar from "./_components/nav/_components/sidebar";

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

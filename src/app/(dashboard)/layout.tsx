import React from "react";
import Navbar from "./_components/nav/_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-background">
      <Navbar>{children}</Navbar>
    </div>
  );
}

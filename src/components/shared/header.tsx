import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={`${inter.className} text-gray-800 text-3xl`}>
      <h1 className="font-bold text-3xl ">{children}</h1>
    </header>
  );
}

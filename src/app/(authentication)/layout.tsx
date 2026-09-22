import React from "react";
import AuthenticationStatic from "./_components/authentication-static";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistMono.variable} ${geistMono.className} ${inter.variable} antialiased grid min-h-screen grid-cols-1 lg:grid-cols-2`}
    >
      <AuthenticationStatic />
      {children}
    </div>
  );
}

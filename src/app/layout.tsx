import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Exam App",
  description: "Test Your Skills",
};

 const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono.variable} ${geistMono.className} ${inter.variable}  ${inter.className} antialiased text-gray-800`}
      >
        <Providers>{children}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}

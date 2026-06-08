import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philix",
  description: "Movies by Philipa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#fafafa]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className=" border-t-4 border-black bg-black text-white py-2 px-6">
          <div className=" border-t-4 border-black bg-black text-white py-2 px-6">
            <p className="font-black text-xl tracking-tight"> PHILIX</p>
            <p className=" text-sm text-gray-400">
              Built by Philipa with Next.js, Python and SQLite
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

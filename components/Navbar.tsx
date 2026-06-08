"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`font-bold text-sm uppercase tracking-wide px-3 py-1 border-2 transition-all ${pathname === href ? "border-black bg-[#fde047]" : "border-transparent hover:border-black hover:bg-[#fde047]"}`}
    >
      {label}
    </Link>
  );
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black ">
      <div className=" max-w-7xl max-auto px-4 h-16 flex items-center justify-between gap-4">
        {/*Logo*/}

        <Link href="/" className="flex-items-center gap-2 shrink-0 ">
          <span className="text-2xl font-black tracking-tight leading-none border-2 border-black bg-[#f472b6] px-2 py-0.5">
            PHILIX
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLink("/", "Home")}
          {navLink("/movies", "Movies")}
          {/* {navLink("/bookings", "My Ticket")} */}
        </div>

        <button
          className="md:hidden border-2 border-black p-2 font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden boder-t-4 border-black bg-white px-4 py-4 flex flex-col gap-3">
          <Link
            href="/"
            className="font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Movies
          </Link>
        </div>
      )}
    </nav>
  );
}

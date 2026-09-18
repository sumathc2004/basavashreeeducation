"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/data/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="container-edu flex h-[4.5rem] items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.jpeg" alt="Basavashree Education" width={44} height={44} className="h-11 w-11 rounded-lg object-contain" priority />
          <span className="hidden text-lg font-bold text-navy-950 sm:block">
            Basavashree <span className="text-royal-600">Education</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-sky-100 text-royal-600" : "text-navy-800 hover:bg-sky-50 hover:text-royal-600"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-navy-800 hover:text-royal-600">
            Login
          </Link>
          <Button href="/register" variant="outline" size="sm">
            Register
          </Button>
          <Button href="/courses" variant="primary" size="sm">
            Explore Courses
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-edu flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-sky-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
              <Button href="/login" variant="outline" size="sm">
                Login
              </Button>
              <Button href="/register" variant="ghost" size="sm">
                Register
              </Button>
              <Button href="/courses" variant="primary" size="sm">
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

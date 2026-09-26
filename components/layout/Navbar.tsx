"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { logout, useSession } from "@/lib/auth-client";
import { ChevronDownIcon, LayoutDashboardIcon, LogOutIcon, UserIcon } from "@/components/icons";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { session, refresh } = useSession();
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-check on every route change, so the navbar reflects a fresh login/logout
    // that just happened on another page.
    refresh();
  }, [pathname, refresh]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setAccountOpen(false);
    setOpen(false);
    router.push("/");
  }

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
          {session ? (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-medium text-navy-800 hover:bg-sky-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-600 text-xs font-bold text-white">
                  {session.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[8rem] truncate">{session.name}</span>
                <ChevronDownIcon className={cn("h-4 w-4 text-muted transition-transform", accountOpen && "rotate-180")} />
              </button>

              {accountOpen ? (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-line bg-white py-2 shadow-lg shadow-navy-900/10">
                  <p className="truncate px-4 py-1.5 text-xs text-muted">{session.email}</p>
                  <Link
                    href="/dashboard"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-navy-800 hover:bg-sky-50"
                  >
                    <LayoutDashboardIcon className="h-4 w-4 text-royal-600" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard?tab=Profile"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-navy-800 hover:bg-sky-50"
                  >
                    <UserIcon className="h-4 w-4 text-royal-600" />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 border-t border-line px-4 py-2 pt-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-navy-800 hover:text-royal-600">
                Login
              </Link>
              <Button href="/register" variant="outline" size="sm">
                Register
              </Button>
            </>
          )}
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

            {session ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-line pt-4">
                <div className="flex items-center gap-3 px-3 pb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-600 text-xs font-bold text-white">
                    {session.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{session.name}</p>
                    <p className="text-xs text-muted">{session.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-sky-50"
                >
                  <LayoutDashboardIcon className="h-4 w-4 text-royal-600" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard?tab=Profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-sky-50"
                >
                  <UserIcon className="h-4 w-4 text-royal-600" />
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Log Out
                </button>
                <Button href="/courses" variant="primary" size="sm" className="mt-2">
                  Explore Courses
                </Button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

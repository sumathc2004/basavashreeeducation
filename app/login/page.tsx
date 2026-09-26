"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";
import { AwardIcon, BookIcon, CheckIcon, LockIcon, UserIcon } from "@/components/icons";

const highlights = [
  "Continue your courses right where you left off",
  "Track progress and download certificates",
  "View payment history and enrollments",
];

export default function LoginPage() {
  const router = useRouter();
  const { session, refresh } = useSession();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Already logged in — no reason to show the login form again.
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Invalid phone number / email or password.");
      await refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (session === undefined || session) {
    return (
      <Container className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </Container>
    );
  }

  return (
    <section className="section-tint py-10 lg:py-16">
      <Container className="max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-900/10 ring-1 ring-line lg:grid-cols-2">
          <div className="relative hidden overflow-hidden brand-gradient p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-gold-400/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <Image src="/logo.jpeg" alt="Basavashree Education" width={44} height={44} className="h-11 w-11 rounded-xl bg-white object-contain p-1" />
              <span className="text-lg font-bold">
                Basavashree <span className="text-sky-300">Education</span>
              </span>
            </div>

            <div className="relative">
              <h2 className="text-3xl font-extrabold leading-tight">
                Welcome back, <span className="text-sky-300">learner!</span>
              </h2>
              <p className="mt-3 text-sm text-sky-100/90">Sign in to pick up your learning journey.</p>
              <ul className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-sky-50">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex gap-6 text-xs text-sky-100">
              <span className="flex items-center gap-2"><BookIcon className="h-4 w-4 text-sky-300" /> 50+ Courses</span>
              <span className="flex items-center gap-2"><AwardIcon className="h-4 w-4 text-gold-400" /> Certified Programs</span>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <Image src="/logo.jpeg" alt="Basavashree Education" width={52} height={52} className="h-13 w-13 rounded-xl object-contain lg:hidden" />
            <h1 className="mt-4 text-2xl font-bold text-navy-950 lg:mt-0">Log in to your account</h1>
            <p className="mt-1.5 text-sm text-muted">Use your registered phone number or email.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="identifier" className="text-sm font-medium text-navy-800">
                  Phone Number or Email
                </label>
                <div className="relative mt-2">
                  <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="identifier"
                    required
                    autoComplete="username"
                    value={form.identifier}
                    onChange={(event) => setForm((prev) => ({ ...prev, identifier: event.target.value }))}
                    className="w-full rounded-xl border border-line bg-sky-50/40 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-royal-500 focus:bg-white focus:ring-2 focus:ring-royal-500/20"
                    placeholder="Enter phone number or email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-navy-800">
                  Password
                </label>
                <div className="relative mt-2">
                  <LockIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full rounded-xl border border-line bg-sky-50/40 py-3 pl-11 pr-16 text-sm outline-none transition focus:border-royal-500 focus:bg-white focus:ring-2 focus:ring-royal-500/20"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-royal-600 hover:bg-sky-100"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p> : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted">
              New to Basavashree Education?{" "}
              <Link href="/register" className="font-semibold text-royal-600 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

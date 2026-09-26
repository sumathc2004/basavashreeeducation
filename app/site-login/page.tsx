"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AwardIcon, BookIcon, LockIcon, PhoneIcon, ShieldIcon, UserIcon } from "@/components/icons";

function SiteLoginForm() {
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/site-gate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Invalid phone number or password.");
      }

      const next = searchParams.get("next") ?? "/";
      window.location.href = next;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-4.5rem)]">
      <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden brand-gradient px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Basavashree Education"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl bg-white object-contain p-1"
            />
            <span className="text-lg font-bold">
              Basavashree <span className="text-sky-300">Education</span>
            </span>
          </div>

          <div className="relative max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-100">
              <ShieldIcon className="h-4 w-4" />
              Private Access
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Learn Today. <span className="text-sky-300">Build Your Future.</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-sky-100/90">
              This platform is currently in private preview. Sign in with your access credentials to explore courses,
              manage enrollments and track learning progress.
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-4 text-sky-100">
            <div>
              <BookIcon className="h-5 w-5 text-sky-300" />
              <p className="mt-2 text-sm font-semibold text-white">50+</p>
              <p className="text-xs">Courses</p>
            </div>
            <div>
              <UserIcon className="h-5 w-5 text-sky-300" />
              <p className="mt-2 text-sm font-semibold text-white">25,000+</p>
              <p className="text-xs">Learners</p>
            </div>
            <div>
              <AwardIcon className="h-5 w-5 text-sky-300" />
              <p className="mt-2 text-sm font-semibold text-white">Certified</p>
              <p className="text-xs">Programs</p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center bg-white px-6 py-16 sm:px-10">
          <div className="w-full max-w-sm">
            <Image
              src="/logo.jpeg"
              alt="Basavashree Education"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-contain lg:hidden"
            />
            <span className="mt-4 hidden items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-royal-600 lg:inline-flex">
              <ShieldIcon className="h-4 w-4" />
              Private Access
            </span>
            <h2 className="mt-4 text-2xl font-bold text-navy-950 lg:mt-5">Sign in to continue</h2>
            <p className="mt-1.5 text-sm text-muted">Enter your access credentials to view this site.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-navy-800">
                  Phone Number
                </label>
                <div className="relative mt-2">
                  <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="phone"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-xl border border-line py-2.5 pl-11 pr-4 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                    placeholder="Registered phone number"
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
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-line py-2.5 pl-11 pr-4 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Verifying..." : "Enter Site"}
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-muted">
              Access is limited to authorised accounts only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SiteLoginPage() {
  return (
    <Suspense fallback={null}>
      <SiteLoginForm />
    </Suspense>
  );
}

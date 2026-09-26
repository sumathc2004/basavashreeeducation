"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSession, saveSession } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Already logged in — no reason to show the login form again.
    if (getSession()) {
      router.replace("/dashboard");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resolving the client-only session post-hydration is intentional
    setCheckingSession(false);
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSession({ name: form.name || form.email.split("@")[0], email: form.email });
    router.push("/dashboard");
  }

  if (checkingSession) {
    return (
      <Container className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </Container>
    );
  }

  return (
    <section className="section-tint flex min-h-[calc(100vh-10rem)] items-center py-14">
      <Container className="max-w-md">
        <div className="rounded-2xl card-surface p-8">
          <h1 className="text-2xl font-bold text-navy-950">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Log in to access your dashboard and continue learning.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy-800">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-navy-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-navy-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Log In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-royal-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

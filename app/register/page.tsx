"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const { session, refresh } = useSession();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Already registered/logged in — no reason to show the sign-up form again.
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
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
    <section className="section-tint flex min-h-[calc(100vh-10rem)] items-center py-14">
      <Container className="max-w-md">
        <div className="rounded-2xl card-surface p-8">
          <h1 className="text-2xl font-bold text-navy-950">Create your account</h1>
          <p className="mt-1 text-sm text-muted">Join Basavashree Education and start learning today.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy-800">
                Full Name
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
              <label htmlFor="phone" className="text-sm font-medium text-navy-800">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="+91 90000 00000"
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
                minLength={6}
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="At least 6 characters"
              />
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-royal-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

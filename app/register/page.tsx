"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { saveSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSession(form);
    router.push("/dashboard");
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
                className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Create Account
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

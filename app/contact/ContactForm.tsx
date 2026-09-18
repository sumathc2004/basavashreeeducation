"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl card-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy-800">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
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
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-navy-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20"
          placeholder="How can we help?"
        />
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>

      {status === "sent" ? <p className="mt-3 text-sm font-medium text-royal-600">Thanks! We&apos;ll get back to you shortly.</p> : null}
      {status === "error" ? <p className="mt-3 text-sm font-medium text-red-600">Something went wrong. Please try again.</p> : null}
    </form>
  );
}

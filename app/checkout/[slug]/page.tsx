"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseBySlug } from "@/lib/data/courses";
import { useSession } from "@/lib/auth-client";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type OrderResponse = {
  orderId: string;
  reference: string;
  amount: number;
  status: string;
  checkoutUrl: string;
};

export default function CheckoutPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const course = getCourseBySlug(params.slug);

  const { session } = useSession();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- prefilling from the async session fetch once it resolves is intentional
      setForm({ name: session.name ?? "", email: session.email ?? "", phone: session.phone ?? "" });
    }
  }, [session]);

  if (!course) {
    return (
      <Container className="py-20 text-center">
        <p className="text-lg font-semibold text-navy-950">Course not found.</p>
      </Container>
    );
  }

  async function handleCreateOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course!.slug, customerName: form.name, customerEmail: form.email, customerPhone: form.phone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function handlePayNow() {
    if (!order) return;
    router.push(order.checkoutUrl);
  }

  return (
    <section className="section-tint py-14 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl card-surface p-6">
            <h2 className="text-lg font-bold text-navy-950">Order Summary</h2>
            <div className="mt-4 flex items-start justify-between gap-4 border-b border-line pb-4">
              <div>
                <p className="font-semibold text-navy-950">{course.title}</p>
                <p className="mt-1 text-sm text-muted">{course.duration} &middot; {course.level}</p>
              </div>
              <p className="font-semibold text-navy-950">₹{course.price.toLocaleString("en-IN")}</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted">
              <span>Course Price</span>
              <span>₹{course.price.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-bold text-navy-950">
              <span>Total Payable</span>
              <span>₹{course.price.toLocaleString("en-IN")}</span>
            </div>

            {order ? (
              <div className="mt-6 space-y-3 rounded-xl bg-sky-50 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Order ID</span>
                  <span className="font-mono font-medium text-navy-950">{order.orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Payment Status</span>
                  <span className="rounded-full bg-gold-500/20 px-2.5 py-1 text-xs font-semibold text-gold-600">{order.status}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-2xl card-surface p-6 sm:p-8">
            <h1 className="text-xl font-bold text-navy-950">Checkout</h1>
            <p className="mt-1 text-sm text-muted">Enter your details to proceed to secure payment via Namma API.</p>

            {!order ? (
              <form onSubmit={handleCreateOrder} className="mt-6 space-y-4">
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
                  />
                </div>

                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Creating Order..." : "Continue to Payment"}
                </Button>
              </form>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-line p-4 text-sm text-navy-800">
                  <p><span className="text-muted">Name:</span> {form.name}</p>
                  <p className="mt-1"><span className="text-muted">Email:</span> {form.email}</p>
                  <p className="mt-1"><span className="text-muted">Phone:</span> {form.phone}</p>
                </div>
                <Button size="lg" className="w-full" onClick={handlePayNow}>
                  Pay Now — ₹{order.amount.toLocaleString("en-IN")}
                </Button>
                <p className="text-center text-xs text-muted">You will be redirected to the Namma API secure payment gateway.</p>
                <p className="text-center text-xs text-muted">
                  By proceeding, you agree to our{" "}
                  <Link href="/legal/refund-policy" className="font-medium text-royal-600 hover:underline">
                    Cancellation & Refund Policy
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

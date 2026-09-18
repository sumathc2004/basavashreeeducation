"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ShieldIcon } from "@/components/icons";

type Order = {
  orderId: string;
  courseTitle: string;
  amount: number;
  customerName: string;
  status: string;
};

export default function PaymentGatewayPage() {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${params.orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch(() => setOrder(null));
  }, [params.orderId]);

  async function handleOutcome(mockOutcome: "SUCCESS" | "FAILED") {
    setProcessing(true);
    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: params.orderId, mockOutcome }),
      });
      const data = await response.json();
      if (data.status === "SUCCESS") {
        router.push(`/payment/success/${params.orderId}`);
      } else {
        router.push(`/payment/failed/${params.orderId}`);
      }
    } catch {
      router.push(`/payment/failed/${params.orderId}`);
    }
  }

  if (!order) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted">Loading payment gateway...</p>
      </Container>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center bg-navy-950 py-14">
      <Container className="max-w-md">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-royal-600">
            <ShieldIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-lg font-bold text-navy-950">Namma API Secure Payment Gateway</h1>
          <p className="mt-1 text-sm text-muted">Demo mode — no real payment credentials are configured yet.</p>

          <div className="mt-6 rounded-xl bg-sky-50 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Order ID</span>
              <span className="font-mono text-navy-950">{order.orderId}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted">Course</span>
              <span className="font-medium text-navy-950">{order.courseTitle}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-bold text-navy-950">
              <span>Amount</span>
              <span>₹{order.amount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button size="lg" className="w-full" onClick={() => handleOutcome("SUCCESS")} disabled={processing}>
              {processing ? "Processing..." : "Simulate Successful Payment"}
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={() => handleOutcome("FAILED")} disabled={processing}>
              Simulate Failed Payment
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted">
            This screen stands in for the hosted Namma API checkout. Once live API credentials are added, this page is
            replaced by a redirect to Namma API&apos;s real payment interface.
          </p>
        </div>
      </Container>
    </section>
  );
}

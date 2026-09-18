import { notFound } from "next/navigation";
import { getOrder } from "@/lib/store";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default async function PaymentFailedPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order) notFound();

  return (
    <section className="section-tint flex min-h-[calc(100vh-10rem)] items-center py-14">
      <Container className="max-w-lg">
        <div className="rounded-2xl card-surface p-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <h1 className="mt-5 text-2xl font-bold text-navy-950">Payment Failed</h1>
          <p className="mt-2 text-sm text-muted">
            Your payment for <strong className="text-navy-950">{order.courseTitle}</strong> could not be completed.
            No amount has been charged. You can retry the payment below.
          </p>

          <div className="mt-6 rounded-xl bg-sky-50 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Order ID</span>
              <span className="font-mono text-navy-950">{order.orderId}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted">Status</span>
              <span className="font-semibold text-red-600">Failed</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href={`/checkout/${order.courseSlug}`} size="lg">
              Retry Payment
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

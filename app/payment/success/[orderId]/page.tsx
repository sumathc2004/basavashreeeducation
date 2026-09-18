import { notFound } from "next/navigation";
import { getOrder } from "@/lib/store";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

export default async function PaymentSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order || order.status !== "SUCCESS") notFound();

  return (
    <section className="section-tint flex min-h-[calc(100vh-10rem)] items-center py-14">
      <Container className="max-w-lg">
        <div className="rounded-2xl card-surface p-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-royal-600 text-white">
            <CheckIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-navy-950">Payment Successful</h1>
          <p className="mt-2 text-sm text-muted">
            You&apos;re enrolled in <strong className="text-navy-950">{order.courseTitle}</strong>. A confirmation has
            been sent to {order.customerEmail}.
          </p>

          <div className="mt-6 space-y-2 rounded-xl bg-sky-50 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Order ID</span>
              <span className="font-mono text-navy-950">{order.orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Amount Paid</span>
              <span className="font-medium text-navy-950">₹{order.amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Status</span>
              <span className="font-semibold text-royal-600">Confirmed</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/dashboard" size="lg">
              Go to Dashboard
            </Button>
            <Button href="/courses" variant="outline" size="lg">
              Browse More Courses
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

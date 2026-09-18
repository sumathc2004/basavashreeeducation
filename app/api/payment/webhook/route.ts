import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/namma-api";
import { createEnrollment, getOrder, updateOrderStatus } from "@/lib/store";

/**
 * Receives `transaction.status.updated` events from Namma API. Configure
 * this route's absolute URL (`/api/payment/webhook`) in the Namma API
 * dashboard once live credentials are issued.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const orderId = event.transactionId ?? event.orderId;
  const status: "SUCCESS" | "FAILED" = event.status === "SUCCESS" ? "SUCCESS" : "FAILED";

  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Unknown order." }, { status: 404 });
  }

  const updated = updateOrderStatus(orderId, status);

  if (status === "SUCCESS" && updated) {
    createEnrollment({
      orderId: updated.orderId,
      courseSlug: updated.courseSlug,
      courseTitle: updated.courseTitle,
      customerEmail: updated.customerEmail,
      progress: 0,
      enrolledAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import { NAMMA_MOCK_MODE, getTransactionStatus } from "@/lib/payments/namma-api";
import { createEnrollment, getOrder, updateOrderStatus } from "@/lib/store";

/**
 * Payment Verification -> Enrollment Confirmation -> Course Access
 *
 * In live mode this always re-checks status with Namma API directly (never
 * trusts a client-supplied status). In mock mode, since there is no live
 * gateway to call back to, the outcome is supplied by the demo gateway page
 * the user interacts with at /payment/gateway/[orderId].
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { orderId, mockOutcome } = body ?? {};

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required." }, { status: 400 });
  }

  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  let finalStatus: "SUCCESS" | "FAILED";

  if (NAMMA_MOCK_MODE) {
    finalStatus = mockOutcome === "FAILED" ? "FAILED" : "SUCCESS";
  } else {
    const transaction = await getTransactionStatus(orderId);
    finalStatus = transaction.status === "SUCCESS" ? "SUCCESS" : "FAILED";
  }

  const updated = updateOrderStatus(orderId, finalStatus);

  if (finalStatus === "SUCCESS" && updated) {
    createEnrollment({
      orderId: updated.orderId,
      courseSlug: updated.courseSlug,
      courseTitle: updated.courseTitle,
      customerEmail: updated.customerEmail,
      progress: Math.floor(Math.random() * 20),
      enrolledAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ status: finalStatus, order: updated });
}

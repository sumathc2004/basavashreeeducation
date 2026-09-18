import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCourseBySlug } from "@/lib/data/courses";
import { createPaymentOrder } from "@/lib/payments/namma-api";
import { createOrder } from "@/lib/store";

/**
 * Course -> Checkout -> Customer Details -> Namma API Payment Gateway
 *
 * Creates a local order record and a matching payment order with Namma API,
 * then returns the order id, amount and checkout URL for the client to
 * redirect to.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { courseSlug, customerName, customerEmail, customerPhone } = body ?? {};

  if (!courseSlug || !customerName || !customerEmail || !customerPhone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  const reference = `BSE-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  try {
    const nammaOrder = await createPaymentOrder({
      amountInPaise: course.price * 100,
      reference,
      customerEmail,
      customerName,
      customerPhone,
    });

    createOrder({
      orderId: nammaOrder.orderId,
      reference,
      courseSlug: course.slug,
      courseTitle: course.title,
      amount: course.price,
      customerName,
      customerEmail,
      customerPhone,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      orderId: nammaOrder.orderId,
      reference,
      amount: course.price,
      status: nammaOrder.status,
      checkoutUrl: nammaOrder.checkoutUrl,
    });
  } catch (error) {
    console.error("Failed to create Namma API payment order", error);
    return NextResponse.json({ error: "Unable to initiate payment. Please try again." }, { status: 502 });
  }
}

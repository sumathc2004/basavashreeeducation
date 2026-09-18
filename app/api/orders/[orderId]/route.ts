import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json(order);
}

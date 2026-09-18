import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  // In production, wire this up to an email/notification service.
  console.log("New contact message:", body);

  return NextResponse.json({ success: true });
}

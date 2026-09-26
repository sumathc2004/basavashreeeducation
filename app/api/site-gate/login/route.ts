import { NextResponse } from "next/server";
import { GATE_COOKIE_NAME, checkCredentials, getGateToken } from "@/lib/site-gate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const phone = typeof body?.phone === "string" ? body.phone : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(phone, password)) {
    return NextResponse.json({ error: "Invalid phone number or password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(GATE_COOKIE_NAME, await getGateToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

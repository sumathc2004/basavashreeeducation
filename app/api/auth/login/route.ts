import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/store";
import { verifyPassword } from "@/lib/password";
import { USER_SESSION_COOKIE, createSessionValue } from "@/lib/user-session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ user: { name: user.name, email: user.email, phone: user.phone } });
  response.cookies.set(USER_SESSION_COOKIE, createSessionValue(user.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

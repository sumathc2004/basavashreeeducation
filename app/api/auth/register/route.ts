import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/store";
import { hashPassword } from "@/lib/password";
import { USER_SESSION_COOKIE, createSessionValue } from "@/lib/user-session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "Name, email, phone and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  if (getUserByEmail(email)) {
    return NextResponse.json({ error: "An account with this email already exists. Please log in." }, { status: 409 });
  }

  const user = createUser({
    name,
    email,
    phone,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  });

  const response = NextResponse.json({ user: { name: user.name, email: user.email, phone: user.phone } });
  response.cookies.set(USER_SESSION_COOKIE, createSessionValue({ name: user.name, email: user.email, phone: user.phone }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

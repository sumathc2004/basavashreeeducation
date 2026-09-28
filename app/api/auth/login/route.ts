import { NextResponse } from "next/server";
import { getUserByEmail, getUserByPhone } from "@/lib/store";
import { USER_SESSION_COOKIE, createSessionValue, type SessionUser } from "@/lib/user-session";

// Open login: any phone number / email and any password is accepted. If the
// identifier matches a registered account we reuse that profile; otherwise a
// profile is derived from what was typed.
function resolveUser(identifier: string): SessionUser {
  const isEmail = identifier.includes("@");
  const existing = isEmail ? getUserByEmail(identifier) : getUserByPhone(identifier);
  if (existing) {
    return { name: existing.name, email: existing.email, phone: existing.phone };
  }

  const digits = identifier.replace(/\D/g, "");
  const isPhone = !isEmail && digits.length >= 10;
  const name = isEmail ? identifier.split("@")[0] : identifier;
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: isEmail ? identifier : `${digits || identifier}@basavashreeeducation.in`,
    phone: isPhone ? digits.slice(-10) : "",
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return NextResponse.json({ error: "Phone number / email and password are required." }, { status: 400 });
  }

  const user = resolveUser(identifier);
  const response = NextResponse.json({ user });
  response.cookies.set(USER_SESSION_COOKIE, createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

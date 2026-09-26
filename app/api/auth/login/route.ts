import { NextResponse } from "next/server";
import { getUserByEmail, getUserByPhone } from "@/lib/store";
import { verifyPassword } from "@/lib/password";
import { USER_SESSION_COOKIE, createSessionValue, type SessionUser } from "@/lib/user-session";

// Built-in account that always works, independent of the (non-persistent) file store.
const BUILT_IN_USERNAME = process.env.LOGIN_USERNAME ?? "9902820080";
const BUILT_IN_PASSWORD = process.env.LOGIN_PASSWORD ?? "9902820080";
const BUILT_IN_NAME = process.env.LOGIN_NAME ?? "Basavashree Student";

function findUser(identifier: string, password: string): SessionUser | null {
  if (identifier === BUILT_IN_USERNAME && password === BUILT_IN_PASSWORD) {
    return { name: BUILT_IN_NAME, email: `${BUILT_IN_USERNAME}@basavashreeeducation.in`, phone: BUILT_IN_USERNAME };
  }

  const user = identifier.includes("@") ? getUserByEmail(identifier) : getUserByPhone(identifier);
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return { name: user.name, email: user.email, phone: user.phone };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return NextResponse.json({ error: "Phone number / email and password are required." }, { status: 400 });
  }

  const user = findUser(identifier, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid phone number / email or password." }, { status: 401 });
  }

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

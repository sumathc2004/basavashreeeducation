import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/store";
import { USER_SESSION_COOKIE, verifySessionValue } from "@/lib/user-session";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${USER_SESSION_COOKIE}=([^;]+)`));
  const email = verifySessionValue(match?.[1]);

  if (!email) {
    return NextResponse.json({ user: null });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: { name: user.name, email: user.email, phone: user.phone } });
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USER_SESSION_COOKIE, verifySessionValue } from "@/lib/user-session";

export async function GET() {
  const cookieStore = await cookies();
  const user = verifySessionValue(cookieStore.get(USER_SESSION_COOKIE)?.value);
  return NextResponse.json({ user });
}

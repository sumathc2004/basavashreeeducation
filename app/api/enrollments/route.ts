import { NextResponse } from "next/server";
import { getEnrollmentsByEmail } from "@/lib/store";

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "email is required." }, { status: 400 });
  }
  return NextResponse.json(getEnrollmentsByEmail(email));
}

import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE_NAME, getGateToken } from "@/lib/site-gate";

// Paths reachable without the gate cookie: the gate page itself, its login
// API, and the Namma API webhook (a server-to-server call, secured by its
// own signature check in lib/payments/namma-api.ts, not a browser session).
const PUBLIC_PATHS = new Set([
  "/site-login",
  "/api/site-gate/login",
  "/api/payment/webhook",
  "/favicon.ico",
  "/icon.jpg",
  "/logo.jpeg",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(GATE_COOKIE_NAME)?.value;
  const expected = await getGateToken();

  if (cookie === expected) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "This site is private." }, { status: 401 });
  }

  const loginUrl = new URL("/site-login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

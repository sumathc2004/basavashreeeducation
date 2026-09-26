import crypto from "node:crypto";

/**
 * Signed session cookie for logged-in students. The profile itself is stored
 * inside the signed cookie, so staying logged in doesn't depend on the file
 * store (which is per-instance and non-persistent on Vercel). Only used by
 * Node.js route handlers, never the proxy.ts gate.
 */

export const USER_SESSION_COOKIE = "bse_session";

export type SessionUser = { name: string; email: string; phone: string };

const SESSION_SECRET = process.env.USER_SESSION_SECRET ?? "basavashree-education-user-session-fallback-secret";

function sign(value: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function createSessionValue(user: SessionUser): string {
  const encoded = Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionValue(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(sign(encoded), "utf8");
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const user = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return typeof user?.email === "string" ? user : null;
  } catch {
    return null;
  }
}

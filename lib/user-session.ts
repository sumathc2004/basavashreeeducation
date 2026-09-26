import crypto from "node:crypto";

/**
 * Signed session cookie for logged-in students. Only used by Node.js route
 * handlers (never the Edge proxy.ts gate), so plain node:crypto is fine here.
 */

export const USER_SESSION_COOKIE = "bse_session";

const SESSION_SECRET = process.env.USER_SESSION_SECRET ?? "basavashree-education-user-session-fallback-secret";

export function createSessionValue(email: string): string {
  const encoded = Buffer.from(email, "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(encoded).digest("hex");
  return `${encoded}.${signature}`;
}

export function verifySessionValue(token: string | undefined): string | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(encoded).digest("hex");
  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    return Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

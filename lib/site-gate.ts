/**
 * Site-wide access gate. The entire site is private — every request must
 * carry a valid gate cookie, issued only after logging in with the exact
 * phone number + password configured below. No other credentials work.
 *
 * Uses Web Crypto (`crypto.subtle`), available in both the Edge runtime
 * (middleware) and modern Node.js (route handlers), so both sides compute
 * the identical cookie value from the same shared secret.
 */

const GATE_PHONE = process.env.SITE_GATE_PHONE ?? "9902820080";
const GATE_PASSWORD = process.env.SITE_GATE_PASSWORD ?? "9902820080";

// Set SITE_GATE_SECRET in your environment for a persistent, private signing
// key. This fallback keeps the gate functional out of the box, but anyone
// who can read the source could derive a valid cookie without credentials —
// configure a real secret before relying on this for genuine protection.
const GATE_SECRET = process.env.SITE_GATE_SECRET ?? "basavashree-education-site-gate-fallback-secret";

export const GATE_COOKIE_NAME = "bse_gate";

export function checkCredentials(phone: string, password: string) {
  return phone.trim() === GATE_PHONE && password === GATE_PASSWORD;
}

export async function getGateToken(): Promise<string> {
  const data = new TextEncoder().encode(GATE_SECRET);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

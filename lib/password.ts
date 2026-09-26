import crypto from "node:crypto";

/** Hashes a password with a random per-user salt (scrypt, Node's built-in KDF). */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const derived = crypto.scryptSync(password, salt, 64);
  const hashBuffer = Buffer.from(hash, "hex");
  if (derived.length !== hashBuffer.length) return false;

  return crypto.timingSafeEqual(derived, hashBuffer);
}

"use client";

/**
 * Minimal client-side session for demo purposes (stores name/email in
 * localStorage). Replace with real authentication (NextAuth, a backend
 * session, etc.) before production — this only exists so the dashboard and
 * checkout flows have something to key off of.
 */

const STORAGE_KEY = "basavashree_session";

export type Session = { name: string; email: string; phone?: string };

export function saveSession(session: Session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // localStorage unavailable — ignore
  }
}

export function getSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

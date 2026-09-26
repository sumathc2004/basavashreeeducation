"use client";

import { useCallback, useEffect, useState } from "react";

export type Session = { name: string; email: string; phone?: string };

/** Reads/refreshes the logged-in student's session from the server (cookie-based). */
export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setSession(data.user ?? null);
    } catch {
      setSession(null);
    }
  }, []);

  useEffect(() => {
    // Fetching the session from the server on mount, then syncing state, is
    // exactly what an effect is for — this isn't a synchronous derived-state
    // update.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch-then-setState, not a synchronous derivation
    refresh();
  }, [refresh]);

  return { session, refresh };
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

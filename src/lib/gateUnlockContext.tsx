"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type GateUnlockContextValue = {
  gateEnabled: boolean;
  /** null = still checking session */
  unlocked: boolean | null;
  refresh: () => void;
};

const Ctx = createContext<GateUnlockContextValue | null>(null);

export function GateUnlockProvider({
  gateEnabled,
  /** When the server already verified the session, skip client guesswork */
  initialUnlocked,
  children,
}: {
  gateEnabled: boolean;
  initialUnlocked?: boolean;
  children: ReactNode;
}) {
  const [unlocked, setUnlocked] = useState<boolean | null>(() => {
    if (!gateEnabled) return true;
    if (initialUnlocked === true) return true;
    return null;
  });

  useEffect(() => {
    if (!gateEnabled || initialUnlocked === true) return;

    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { ok?: boolean }) => {
        if (!cancelled) setUnlocked(data.ok === true);
      })
      .catch(() => {
        if (!cancelled) setUnlocked(false);
      });
    return () => {
      cancelled = true;
    };
  }, [gateEnabled, initialUnlocked]);

  const refresh = useCallback(() => {
    if (!gateEnabled) {
      setUnlocked(true);
      return;
    }
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { ok?: boolean }) => setUnlocked(data.ok === true))
      .catch(() => setUnlocked(false));
  }, [gateEnabled]);

  const value = useMemo(
    () => ({ gateEnabled, unlocked, refresh }),
    [gateEnabled, unlocked, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGateUnlock(): GateUnlockContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      gateEnabled: false,
      unlocked: true,
      refresh: () => {},
    };
  }
  return ctx;
}

"use client";

import { SessionLogout } from "@/components/ui/SessionLogout";
import { gateAuthUi } from "@/lib/content";
import { useGateUnlock } from "@/lib/gateUnlockContext";

type Props = {
  className?: string;
};

export function FooterGateLogout({ className }: Props) {
  const { gateEnabled, unlocked } = useGateUnlock();
  if (!gateEnabled || unlocked !== true) return null;
  return (
    <SessionLogout
      label={gateAuthUi.logout}
      afterLogoutHref="/"
      className={className}
    />
  );
}

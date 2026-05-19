"use client";

import { gateLogoutHref } from "@/lib/content";

type Props = {
  label: string;
  /** After clearing the cookie; defaults to the access gate with password prompt */
  afterLogoutHref?: string;
  className?: string;
};

export function SessionLogout({
  label,
  afterLogoutHref = gateLogoutHref,
  className,
}: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        } finally {
          window.location.replace(afterLogoutHref);
        }
      }}
    >
      {label}
    </button>
  );
}

"use client";

type Props = {
  label: string;
  /** After clearing the cookie; default is the marketing home page. */
  afterLogoutHref?: string;
  className?: string;
};

export function SessionLogout({
  label,
  afterLogoutHref = "/",
  className,
}: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } finally {
          window.location.assign(afterLogoutHref);
        }
      }}
    >
      {label}
    </button>
  );
}

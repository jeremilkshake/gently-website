import { SessionLogout } from "@/components/ui/SessionLogout";
import { gateAuthUi, gateLogoutHref } from "@/lib/content";

type Props = {
  className?: string;
};

/** Logout in footer — only rendered inside the post-gate marketing shell */
export function FooterGateLogout({ className }: Props) {
  return (
    <SessionLogout
      label={gateAuthUi.logout}
      afterLogoutHref={gateLogoutHref}
      className={className}
    />
  );
}

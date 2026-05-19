import { GateHome } from "@/app/GateHome";
import { gateIsEnabled } from "@/lib/gate";
import { verifyGateCookie } from "@/lib/verifyGateCookie";
import { firstSearchParamValue } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Password gate wrapper shared by all public marketing routes. */
export default async function MarketingGate({ children, searchParams }: Props) {
  const sp = await searchParams;
  const gateOn = gateIsEnabled();
  const hasGateSession = gateOn ? await verifyGateCookie() : true;

  if (gateOn && !hasGateSession) {
    const urlGate =
      firstSearchParamValue(sp.gate) ??
      (firstSearchParamValue(sp.reauth) ? "reauth" : null);
    return <GateHome urlFrom={firstSearchParamValue(sp.from)} urlGate={urlGate} />;
  }

  return children;
}

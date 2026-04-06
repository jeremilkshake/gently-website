import { gatePage } from "@/lib/content";
import { firstSearchParamValue } from "@/lib/utils";
import { GateClient } from "./GateClient";

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <GateClient
      content={gatePage}
      urlFrom={firstSearchParamValue(sp.from)}
      urlGate={firstSearchParamValue(sp.gate)}
    />
  );
}

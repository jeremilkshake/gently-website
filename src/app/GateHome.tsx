import { gatePage } from "@/lib/content";
import { GateClient } from "./gate/GateClient";

type Props = {
  urlFrom?: string | null;
  urlGate?: string | null;
};

/** Full-page password gate — no marketing HTML in the response */
export function GateHome({ urlFrom = null, urlGate = null }: Props) {
  return <GateClient content={gatePage} urlFrom={urlFrom} urlGate={urlGate} />;
}

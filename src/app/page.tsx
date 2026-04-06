import Nav from "@/components/nav/Nav";
import ToggleBar from "@/components/nav/ToggleBar";
import { GateHome } from "@/app/GateHome";
import { GateUnlockProvider } from "@/lib/gateUnlockContext";
import { gateIsEnabled } from "@/lib/gate";
import { verifyGateCookie } from "@/lib/verifyGateCookie";
import Hero from "@/components/hero/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/solution/Solution";
import Impact from "@/components/sections/Impact";
import B2BSection from "@/components/sections/B2BSection";
import Pain from "@/components/sections/Pain";
import Science from "@/components/sections/Science";
import Testimonials from "@/components/sections/Testimonials";
import Who from "@/components/sections/Who";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/ui/Footer";
import { firstSearchParamValue } from "@/lib/utils";

/** Prevents shipping one static HTML snapshot of the full site to all visitors */
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const gateOn = gateIsEnabled();
  const hasGateSession = gateOn ? await verifyGateCookie() : true;

  if (gateOn && !hasGateSession) {
    return (
      <GateHome
        urlFrom={firstSearchParamValue(sp.from)}
        urlGate={firstSearchParamValue(sp.gate)}
      />
    );
  }

  return (
    <GateUnlockProvider gateEnabled={gateOn} initialUnlocked={gateOn ? true : undefined}>
      <Nav />
      <ToggleBar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Impact />
        <B2BSection />
        <Pain />
        <Science />
        <Testimonials />
        <Who />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </GateUnlockProvider>
  );
}

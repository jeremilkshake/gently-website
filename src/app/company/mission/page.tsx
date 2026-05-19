import type { Metadata } from "next";
import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import MissionSection from "@/components/company/MissionSection";
import Footer from "@/components/ui/Footer";
import { missionPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our mission | gently.",
  description: missionPage.subhead,
};

export default async function MissionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <MissionSection />
      </main>
      <Footer />
    </MarketingGate>
  );
}

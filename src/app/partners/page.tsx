import type { Metadata } from "next";
import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import Hero from "@/components/hero/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BusinessWhyPartner from "@/components/sections/BusinessWhyPartner";
import CompareScroll from "@/components/sections/CompareScroll";
import { COMPARE_COLUMNS, COMPARE_SECTION_COPY } from "@/lib/compareScrollSteps";
import BusinessPartnership from "@/components/sections/BusinessPartnership";
import B2BSection from "@/components/sections/B2BSection";
import BusinessCompareTable from "@/components/sections/BusinessCompareTable";
import PartnerLeaderQuote from "@/components/sections/PartnerLeaderQuote";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/ui/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "For Partners | gently.",
  description:
    "Bereavement support for hospice and hospitals, education institutions, employers, financial institutions, funeral homes, and consultants.",
};

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <Hero variant="partnersHub" />
        <TrustBar />
        <BusinessWhyPartner />
        <BusinessPartnership />
        <B2BSection />
        <BusinessCompareTable />
        <PartnerLeaderQuote />
        <CompareScroll
          placement="preCta"
          eyebrow={COMPARE_SECTION_COPY.eyebrow}
          line1={COMPARE_SECTION_COPY.line1}
          line2={COMPARE_SECTION_COPY.line2}
          subheadingPrefix={COMPARE_SECTION_COPY.subheadingPrefix}
          subheadingBrand={COMPARE_SECTION_COPY.subheadingBrand}
          columns={COMPARE_COLUMNS}
        />
        <Cta />
      </main>
      <Footer />
    </MarketingGate>
  );
}

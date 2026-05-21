import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import PartnerHero from "@/components/hero/PartnerHero";
import TrustBar from "@/components/sections/TrustBar";
import BusinessWhyPartner from "@/components/sections/BusinessWhyPartner";
import CompareScroll from "@/components/sections/CompareScroll";
import { COMPARE_COLUMNS, COMPARE_SECTION_COPY } from "@/lib/compareScrollSteps";
import BusinessPartnership from "@/components/sections/BusinessPartnership";
import Solution from "@/components/solution/Solution";
import BusinessCompareTable from "@/components/sections/BusinessCompareTable";
import PartnerLeaderQuote from "@/components/sections/PartnerLeaderQuote";
import BusinessPricingModel from "@/components/sections/BusinessPricingModel";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/ui/Footer";
import { partnerPages, partnerSlugs, b2bSolutions } from "@/lib/content";
import { isPartnerSlug } from "@/lib/routes";
import type { PartnerSlug } from "@/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return partnerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPartnerSlug(slug)) return {};
  const solution = b2bSolutions.find((s) => s.slug === slug);
  return {
    title: solution ? `${solution.title} | gently.` : "Partners | gently.",
    description: solution?.dropdownDesc,
  };
}

export default async function PartnerVerticalPage({ params, searchParams }: Props) {
  const { slug } = await params;
  if (!isPartnerSlug(slug)) notFound();

  const page = partnerPages[slug as PartnerSlug];

  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <PartnerPageBody page={page} />
      </main>
      <Footer />
    </MarketingGate>
  );
}

function PartnerPageBody({ page }: { page: (typeof partnerPages)[PartnerSlug] }) {
  return (
    <>
      <PartnerHero content={page.hero} />
      <TrustBar />
      <BusinessWhyPartner />
      <BusinessPartnership />
      <Solution />
      <BusinessCompareTable />
      <PartnerLeaderQuote />
      <BusinessPricingModel />
      <Faq />
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
    </>
  );
}

import type { Metadata } from "next";
import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import Hero from "@/components/hero/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BereavementIntro from "@/components/sections/BereavementIntro";
import CustomApproachCare from "@/components/sections/CustomApproachCare";
import CompareScroll from "@/components/sections/CompareScroll";
import { COMPARE_COLUMNS, COMPARE_SECTION_COPY } from "@/lib/compareScrollSteps";
import Problem from "@/components/sections/Problem";
import NotAlone from "@/components/sections/NotAlone";
import Solution from "@/components/solution/Solution";
import Pain from "@/components/sections/Pain";
import IndividualCompareTable from "@/components/sections/IndividualCompareTable";
import Science from "@/components/sections/Science";
import Testimonials from "@/components/sections/Testimonials";
import Who from "@/components/sections/Who";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/ui/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "For You | gently.",
  description: "Estate, admin, and grief support in one calm place after loss.",
};

export default async function ForYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <Hero variant="forYou" />
        <TrustBar />
        <Problem />
        <NotAlone />
        <BereavementIntro />
        <CustomApproachCare />
        <Solution />
        <Pain />
        <IndividualCompareTable />
        <Testimonials />
        <Science />
        <Who />
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
      </main>
      <Footer />
    </MarketingGate>
  );
}

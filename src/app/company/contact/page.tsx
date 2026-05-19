import type { Metadata } from "next";
import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import ContactSection from "@/components/company/ContactSection";
import Footer from "@/components/ui/Footer";
import { contactPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact us | gently.",
  description: contactPage.headline,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </MarketingGate>
  );
}

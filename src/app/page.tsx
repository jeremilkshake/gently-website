import SiteHeader from "@/components/nav/SiteHeader";
import MarketingGate from "@/components/layout/MarketingGate";
import HomeChooser from "@/components/home/HomeChooser";
import Footer from "@/components/ui/Footer";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <MarketingGate searchParams={searchParams}>
      <SiteHeader />
      <main>
        <HomeChooser />
      </main>
      <Footer />
    </MarketingGate>
  );
}

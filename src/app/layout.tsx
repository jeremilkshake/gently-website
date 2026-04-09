import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "@/lib/audienceContext";
import { ScrollReset } from "@/components/ui/ScrollReset";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "gently",
  description: "gently",
  robots: {
    index: true,
    follow: false,
    nosnippet: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

const pageSurface = {
  backgroundColor: "var(--bg)",
  color: "var(--text)",
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${nunito.variable}`}
      style={pageSurface}
    >
      <body style={pageSurface}>
        <SmoothScroll />
        <ScrollReset />
        <AudienceProvider>{children}</AudienceProvider>
        <Analytics />
      </body>
    </html>
  );
}

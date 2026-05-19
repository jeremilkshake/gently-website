"use client";

import { Heart, ShieldCheck } from "lucide-react";
import {
  bookingUrl,
  heroBusinessTrustBadges,
  openExternalTab,
} from "@/lib/content";
import type { PartnerPageHeroContent } from "@/types";

const HERO_TRUST_ICONS = {
  heart: Heart,
  shield: ShieldCheck,
} as const;

type Props = {
  content: PartnerPageHeroContent;
};

export default function PartnerHero({ content }: Props) {
  return (
    <section
      id="hero"
      className="relative isolate flex flex-col items-center justify-center overflow-x-hidden bg-[var(--hero-sky)] px-6 pb-16 pt-[calc(var(--header-nav-h)+4rem+env(safe-area-inset-top,0px))] text-center scroll-mt-[var(--header-nav-h)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-sky.svg)" }}
      />
      <div className="relative z-[1] max-w-[780px]">
        <p className="font-reading mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[var(--accent)]">
          {content.kicker}
        </p>
        <h1 className="hero-headline font-serif mx-auto mb-4 text-[clamp(32px,4.8vw,58px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
          {content.headline}
        </h1>
        <p className="font-reading mx-auto mb-9 max-w-[560px] text-[clamp(15px,1.8vw,18px)] font-light leading-[1.65] text-[var(--muted)]">
          {content.lede}
        </p>
        <div className="mb-5 flex flex-wrap justify-center gap-2.5">
          <a
            href={bookingUrl}
            {...openExternalTab}
            className="inline-flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-3 font-nunito text-sm font-extrabold text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
          >
            {content.primaryCta}
          </a>
          <a
            href={content.secondaryHref}
            className="inline-flex min-h-[3rem] items-center justify-center rounded-[9px] border-2 border-[var(--text)] bg-transparent px-6 py-3 text-[14px] text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition-all hover:bg-[var(--surface-hover)] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
          >
            {content.secondaryCta}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {heroBusinessTrustBadges.map((badge) => {
            const Icon = HERO_TRUST_ICONS[badge.icon];
            return (
              <span
                key={badge.label}
                className="font-reading inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)]"
              >
                <Icon size={14} strokeWidth={1.6} aria-hidden="true" />
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

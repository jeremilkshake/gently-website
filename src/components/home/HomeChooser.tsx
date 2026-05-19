"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeChooser } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { HomeChooserCard } from "@/types";

const reading = "font-reading text-[15px] leading-[1.65] text-[var(--muted)]";

export default function HomeChooser() {
  const ref = useScrollReveal();

  return (
    <section className="relative flex min-h-[calc(100dvh-var(--header-nav-h))] flex-col items-center justify-center bg-[var(--hero-sky)] px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url(/images/hero-sky.svg)" }}
      />
      <div ref={ref} className="fade-up relative z-[1] w-full max-w-[720px]">
        <h1 className="font-serif text-[clamp(28px,4.5vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--text)]">
          {homeChooser.headline}
        </h1>
        <p className={`${reading} mx-auto mt-3 max-w-[500px]`}>{homeChooser.subhead}</p>
        <p className={`${reading} mx-auto mt-2 max-w-[460px] mb-8`}>{homeChooser.intro}</p>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
          <ChooserCard card={homeChooser.families} />
          <ChooserCard card={homeChooser.partners} />
        </div>
      </div>
    </section>
  );
}

function ChooserCard({ card }: { card: HomeChooserCard }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-6 text-left no-underline shadow-card transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] sm:p-7"
    >
      <span className="font-serif text-[18px] font-extrabold tracking-[-0.02em] text-[var(--text)]">
        {card.label}
      </span>
      <p className={`${reading} mt-3 flex-1`}>
        {card.body}
        <br />
        <br />
        {card.closing}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--accent)] transition-all group-hover:gap-2">
        {card.continueLabel ?? "Continue"}
        <ArrowRight size={14} aria-hidden />
      </span>
    </Link>
  );
}

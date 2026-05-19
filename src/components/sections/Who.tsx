"use client";

import { useIsBusiness } from "@/lib/audienceContext";
import { whoCards, whoSection } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export default function Who() {
  const isBiz = useIsBusiness();
  const who = isBiz ? whoSection.business : whoSection.individual;

  return (
    <section id="who" className="py-20 md:py-28 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6 w-full">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-3">
          {who.kicker}
        </p>
        <h2 className="mb-11 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center font-serif text-[clamp(22px,3vw,36px)] font-extrabold tracking-[-0.02em] leading-tight">
          <Logo variant="nav" className="h-[clamp(26px,3.5vw,38px)] w-auto shrink-0" />
          <span className="max-[380px]:basis-full">{who.headlineSuffix}</span>
        </h2>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {whoCards.map((card, i) => (
            <div
              key={card.title}
              className="bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-6 card-hover fade-up visible shadow-card"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="text-[15px] font-medium leading-snug text-[var(--text)] mb-2.5">{card.title}</div>
              <p className="font-reading text-[13px] text-[var(--muted)] leading-[1.65]">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

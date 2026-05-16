"use client";

import { useAudience } from "@/lib/audienceContext";
import { b2bSection, b2bSolutions, openExternalTab } from "@/lib/content";

export default function B2BSection() {
  const { audience } = useAudience();
  if (audience !== "business") return null;

  return (
    <section id="b2b" className="min-h-screen flex items-center py-16 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6 w-full">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {b2bSection.kicker}
        </p>
        <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-extrabold tracking-[-0.02em] text-center mb-11">
          {b2bSection.headline}
        </h2>
        <div className="grid grid-cols-2 gap-3.5">
          {b2bSolutions.map((sol, i) => (
            <div
              key={sol.title}
              id={sol.anchorId}
              className="bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-7 card-hover scroll-mt-[120px] shadow-card"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="text-[24px] mb-3">{sol.icon}</div>
              <div className="text-[16px] font-medium text-[var(--text)] mb-1.5">{sol.title}</div>
              <p className="font-reading text-[13px] text-[var(--muted)] leading-[1.65] mb-3.5">{sol.desc}</p>
              <a
                href={sol.href}
                {...openExternalTab}
                className="text-[12px] text-[var(--accent)] inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

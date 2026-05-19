"use client";

import { scienceSection } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Science() {
  const ref = useScrollReveal();
  const { kicker, headline, subheadLines, researchers } = scienceSection;

  return (
    <section id="science" className="scroll-mt-[120px] bg-[var(--bg)] py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 w-full">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          {kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up mx-auto mb-3 max-w-[720px] text-center font-serif text-[clamp(22px,2.5vw,34px)] font-extrabold tracking-[-0.02em]"
        >
          {headline}
        </h2>
        <div className="fade-up visible mx-auto mb-10 max-w-[22rem] space-y-2 text-center">
          {subheadLines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-reading text-[15px] font-medium leading-snug text-[var(--text)]"
                  : "font-reading text-[13px] font-light leading-snug text-[var(--muted)]"
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {researchers.map((r, i) => (
            <div
              key={r.name}
              className="card-hover fade-up visible rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-5 shadow-card"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="mb-3 border-l-2 border-[var(--accent)] pl-3">
                <div className="text-[13px] font-medium text-[var(--text)]">{r.name}</div>
                <div className="mt-0.5 text-[10px] leading-snug text-[var(--dim)]">{r.role}</div>
              </div>
              <p className="font-reading text-[13px] leading-snug text-[var(--muted)]">
                &ldquo;{r.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

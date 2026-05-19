"use client";

import { businessStatStrip } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function BusinessStatStrip() {
  const ref = useScrollReveal();

  return (
    <section
      id="b2b-why"
      className="py-20 bg-[var(--bg-2)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {businessStatStrip.kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-center mb-4 max-w-[760px] mx-auto"
        >
          {businessStatStrip.headline}
        </h2>
        <p className="fade-up visible font-reading text-[15px] text-[var(--muted)] text-center max-w-[620px] mx-auto mb-12 leading-[1.65] font-light">
          {businessStatStrip.subhead}
        </p>

        <div
          className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--border)] rounded-[20px] overflow-hidden"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {businessStatStrip.stats.map((s) => (
            <div key={s.label} className="bg-[var(--card)] py-9 px-5 text-center">
              <div className="font-serif text-[clamp(26px,3.4vw,42px)] font-extrabold tracking-[-0.03em] leading-none mb-2 text-[var(--accent)]">
                {s.value}
              </div>
              <div className="font-reading text-[12px] text-[var(--muted)] leading-[1.5] whitespace-pre-line">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

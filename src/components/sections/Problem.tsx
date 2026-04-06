"use client";

import { useAudience } from "@/lib/audienceContext";
import { problemSection } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Problem() {
  const { audience } = useAudience();
  const ref = useScrollReveal();
  const copy = audience === "business" ? problemSection.business : problemSection.individual;

  return (
    <section id="problem" className="py-20 bg-[var(--bg-2)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">{copy.tag}</p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-light tracking-[-0.02em] text-center mb-4 max-w-[720px] mx-auto"
        >
          {copy.headline}
        </h2>
        <p className="fade-up visible text-[15px] text-[var(--muted)] text-center max-w-[560px] mx-auto mb-12 leading-[1.65] font-light">
          {copy.subhead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {copy.items.map((item, i) => (
            <div
              key={item.title}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[20px] p-7 card-hover fade-up visible"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-[.12em] mb-3">0{i + 1}</div>
              <h3 className="font-serif text-[17px] font-light text-[var(--text)] mb-2 leading-snug tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-[13px] text-[var(--muted)] leading-[1.65]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

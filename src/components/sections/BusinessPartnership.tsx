"use client";

import { useAudience } from "@/lib/audienceContext";
import { businessPartnership } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function BusinessPartnership() {
  const { audience } = useAudience();
  const ref = useScrollReveal();
  if (audience !== "business") return null;

  return (
    <section
      id="b2b-how"
      className="py-24 bg-[var(--bg)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {businessPartnership.kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-center mb-4 max-w-[720px] mx-auto"
        >
          {businessPartnership.headline}
        </h2>
        <p className="fade-up visible font-reading text-[15px] text-[var(--muted)] text-center max-w-[600px] mx-auto mb-14 leading-[1.65] font-light">
          {businessPartnership.subhead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessPartnership.steps.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-7 card-hover fade-up visible shadow-card"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white mb-4"
                style={{ background: "var(--accent)" }}
              >
                {step.num}
              </div>
              <h3 className="font-serif text-[17px] font-extrabold text-[var(--text)] mb-2 leading-snug tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="font-reading text-[13px] text-[var(--muted)] leading-[1.65]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

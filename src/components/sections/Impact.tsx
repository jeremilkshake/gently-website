"use client";

import { impactSection } from "@/lib/content";

export default function Impact() {
  return (
    <section id="impact" className="py-16 bg-[var(--bg-2)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-serif text-[clamp(20px,2.5vw,30px)] font-extrabold tracking-[-0.02em] text-center mb-10">
          {impactSection.headline}
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 border border-[var(--border)] rounded-[20px] overflow-hidden"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {impactSection.stats.map((s) => (
            <div key={s.num} className="bg-[var(--card)] py-9 px-6 text-center">
              <div
                className="font-serif text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-0.03em] leading-none mb-1.5"
                style={{ color: s.color }}
              >
                {s.num}
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

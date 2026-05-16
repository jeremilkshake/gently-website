"use client";

import { testimonials, testimonialsSection } from "@/lib/content";

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="min-h-screen flex flex-col justify-center py-16 bg-[var(--bg-2)] overflow-hidden scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6 mb-4 text-center">
        <h2 className="font-serif text-[clamp(22px,2.5vw,34px)] font-extrabold tracking-[-0.02em] mb-3">
          {testimonialsSection.headline}
        </h2>
        <p className="font-reading mx-auto max-w-[28rem] text-sm leading-relaxed text-[var(--muted)] font-light">
          {testimonialsSection.subhead}
        </p>
      </div>

      <div className="relative mt-8">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, var(--bg-2), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, var(--bg-2), transparent)" }}
        />

        <div className="flex gap-3.5 marquee-track w-max">
          {doubled.map((t, i) => (
            <div
              key={`${t.user}-${i}`}
              className="bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-5 w-[min(100vw-3rem,300px)] sm:w-[300px] flex-shrink-0 shadow-card"
            >
              <div className="mb-3 border-l-2 border-[var(--accent)] pl-3">
                <div className="text-[13px] font-medium text-[var(--text)]">{t.user}</div>
                <div className="text-[10px] leading-snug text-[var(--dim)] mt-0.5">{t.source}</div>
              </div>
              <p className="font-reading text-[13px] text-[var(--muted)] leading-snug">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

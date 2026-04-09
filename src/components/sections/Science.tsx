"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const researchers = [
  {
    name: "Mary-Frances O'Connor",
    role: "Grief Researcher · University of Arizona",
    quote:
      '"The bereaved brain is doing exactly what a brain does when it has lost something it tracked closely — running old predictions and finding nothing there."',
  },
  {
    name: "George Bonanno",
    role: "Resilience Researcher · Columbia University",
    quote:
      '"Most bereaved individuals show resilience — stable function alongside periods of difficulty. Grief does not require prolonged impairment."',
  },
  {
    name: "Kristin Neff",
    role: "Self-Compassion Researcher · UT Austin",
    quote:
      '"Self-compassion is one of the most evidence-supported predictors of healthy grief adjustment. People who treat themselves with care process grief more effectively."',
  },
];

export default function Science() {
  const ref = useScrollReveal();

  return (
    <section id="science" className="py-16 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          The research
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(24px,3vw,38px)] font-light tracking-[-0.02em] text-center mb-11"
        >
          Built on real published science.
        </h2>
        <div className="grid grid-cols-3 gap-3.5">
          {researchers.map((r, i) => (
            <div
              key={r.name}
              className="bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-6 fade-up visible shadow-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-[15px] font-medium text-[var(--text)] mb-0.5">{r.name}</div>
              <div className="text-[10px] uppercase tracking-[.09em] text-[var(--accent)] mb-3">{r.role}</div>
              <p className="text-[13px] text-[var(--muted)] leading-[1.6] italic">{r.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

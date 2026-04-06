"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const painPoints = [
  "You don't know what you own, what's owed, or what happens next",
  "You're managing paperwork while trying to grieve — at the same time",
  "You say you're fine and it costs you every time",
  "Nobody told you loss would also mean hundreds of hours of admin",
  "Sleep doesn't fix the exhaustion — you wake carrying it again",
  "You want to understand what's happening, not just be told it gets better",
];

export default function Pain() {
  const ref = useScrollReveal();

  return (
    <section id="pain" className="py-20 bg-[var(--bg-2)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3vw,40px)] font-light tracking-[-0.02em] text-center mb-9"
        >
          Does any of this feel true right now?
        </h2>

        {/* Reddit card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[20px] p-5 max-w-[580px] mx-auto mb-11 flex gap-3.5 items-start fade-up visible">
          <div className="w-7 h-7 rounded-full bg-[#FF4500] flex-shrink-0 flex items-center justify-center text-[13px] font-bold text-white">
            r
          </div>
          <div>
            <div className="text-[11px] text-[var(--muted)] mb-1.5">u/anonymous · r/grief</div>
            <p className="text-[14px] text-[var(--text)] italic leading-[1.55]">
              "Nobody told me grief would feel this physical. I just lie there at 3am waiting for morning."
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2.5 max-w-[720px] mx-auto">
          {painPoints.map((point, i) => (
            <div
              key={point}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[12px] px-5 py-4 flex items-start gap-3 card-hover fade-up visible"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div
                className="w-4 h-px bg-[var(--accent)] flex-shrink-0 mt-[10px]"
              />
              <span className="text-[14px] text-[var(--text)] leading-[1.5]">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

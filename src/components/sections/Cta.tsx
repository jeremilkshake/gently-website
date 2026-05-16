"use client";

import { useIsBusiness } from "@/lib/audienceContext";
import { bookingUrl, ctaSection, openExternalTab } from "@/lib/content";

export default function Cta() {
  const isBiz = useIsBusiness();
  const copy = isBiz ? ctaSection.business : ctaSection.individual;

  return (
    <section id="cta" className="min-h-screen flex flex-col items-center justify-center py-24 px-6 text-center bg-[var(--bg)] relative overflow-hidden scroll-mt-[120px]">
      {/* Glow */}
      <div
        className="absolute w-[500px] h-[280px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--glow-wellbeing) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-extrabold tracking-[-0.025em] mb-4 leading-[1.12]">
          {copy.headlineBeforeBreak}
          <br />
          {copy.headlineQuestion}
        </h2>
        <p className="font-reading text-[15px] sm:text-base text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          {copy.subhead}
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap">
          <a
            href={bookingUrl}
            {...openExternalTab}
            className="font-nunito font-extrabold min-h-[3rem] min-w-[9.5rem] flex-1 rounded-xl px-5 py-3 uppercase tracking-[0.1em] text-xs sm:text-sm sm:min-w-[11rem] border-2 border-[var(--text)] shadow-[0_4px_0_0_var(--text)] bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
          >
            {copy.primaryCta}
          </a>
          <a
            href={copy.secondaryHref}
            className="bg-transparent text-[var(--text)] border-2 border-[var(--text)] px-6 py-3 rounded-[9px] text-[14px] shadow-[0_4px_0_0_var(--text)] hover:bg-[var(--surface-hover)] transition-all active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
          >
            {copy.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}

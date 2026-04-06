"use client";

import { useAudience } from "@/lib/audienceContext";
import { bookingUrl, openExternalTab } from "@/lib/content";

export default function Cta() {
  const { audience } = useAudience();
  const isBiz = audience === "business";

  return (
    <section id="cta" className="py-24 px-6 text-center bg-[var(--bg)] relative overflow-hidden scroll-mt-[120px]">
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

      <div className="relative">
        {isBiz ? (
          <>
            <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-light tracking-[-0.025em] mb-3">
              Bring gently<br />to your organisation.
            </h2>
            <p className="text-[15px] text-[var(--muted)] max-w-[360px] mx-auto mb-9">
              Everyone deserves support after loss. Let&apos;s talk about bringing it to your people.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-[9px] text-[14px] font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                Book a demo
              </a>
              <a
                href="#"
                className="bg-transparent text-[var(--text)] border border-[var(--border)] px-6 py-3 rounded-[9px] text-[14px] hover:border-[var(--muted)] hover:-translate-y-0.5 transition-all"
              >
                View solutions
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-light tracking-[-0.025em] mb-3">
              Everything that comes after loss,<br />in one place.
            </h2>
            <p className="text-[15px] text-[var(--muted)] max-w-[360px] mx-auto mb-9">
              Estate mapping. Admin handled. Grief supported. Start today.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-[9px] text-[14px] font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                Get early access
              </a>
              <a
                href="#"
                className="bg-transparent text-[var(--text)] border border-[var(--border)] px-6 py-3 rounded-[9px] text-[14px] hover:border-[var(--muted)] hover:-translate-y-0.5 transition-all"
              >
                Learn more
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

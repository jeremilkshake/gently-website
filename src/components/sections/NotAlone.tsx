"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function NotAlone() {
  const ref = useScrollReveal();

  return (
    <section className="flex items-center justify-center bg-[var(--bg)] py-20 md:py-28">
      <div className="max-w-content mx-auto px-6 text-center">
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.025em] text-[var(--text)] mb-5"
        >
          You&apos;re not alone.
        </h2>
        <p className="fade-up visible font-reading text-[clamp(15px,1.6vw,18px)] text-[var(--muted)] max-w-[520px] mx-auto leading-[1.6] font-light">
          Millions of emotionally resilient people grieve every day. The weight you&apos;re carrying is shared, even when it feels invisible.
        </p>
      </div>
    </section>
  );
}

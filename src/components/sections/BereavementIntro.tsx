"use client";

import { bereavementIntro } from "@/lib/content";

export default function BereavementIntro() {
  return (
    <section
      id="bereavement-intro"
      className="bg-[var(--bg)] py-16 border-y border-[var(--border)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6 text-center">
        <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] font-light tracking-[-0.02em] text-[var(--text)] mb-4">
          {bereavementIntro.headline}
        </h2>
        <p className="text-[clamp(16px,1.8vw,21px)] leading-[1.7] text-[var(--muted)] max-w-[860px] mx-auto">
          <span className="text-[var(--text)]">{bereavementIntro.brand}</span>{" "}
          {bereavementIntro.body}
        </p>
      </div>
    </section>
  );
}

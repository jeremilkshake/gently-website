"use client";

import Link from "next/link";
import { missionPage } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function MissionSection() {
  const ref = useScrollReveal();

  return (
    <section className="min-h-[calc(100dvh-var(--header-nav-h))] bg-[var(--bg)] px-6 py-20 pt-[calc(var(--header-nav-h)+3rem)]">
      <div className="mx-auto max-w-[680px]">
        <p className="font-reading mb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-[var(--accent)]">
          {missionPage.kicker}
        </p>
        <h1
          ref={ref}
          className="fade-up font-serif mb-4 text-[clamp(32px,4vw,48px)] font-extrabold tracking-[-0.02em]"
        >
          {missionPage.headline}
        </h1>
        <p className="fade-up visible font-reading mb-10 text-[17px] font-light leading-[1.65] text-[var(--muted)]">
          {missionPage.subhead}
        </p>
        <div className="fade-up visible space-y-6">
          {missionPage.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="font-reading text-[15px] leading-[1.75] text-[var(--text)]">
              {paragraph}
            </p>
          ))}
        </div>
        {missionPage.founderStory ? (
          <div className="fade-up visible mt-14 space-y-6 border-t border-[var(--border)] pt-14">
            <h2 className="font-serif text-[clamp(22px,2.5vw,28px)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
              {missionPage.founderStory.heading}
            </h2>
            {missionPage.founderStory.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-reading text-[15px] leading-[1.75] text-[var(--text)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        <Link
          href={missionPage.ctaHref}
          className="mt-12 inline-flex min-h-[3rem] items-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-3 font-nunito text-sm font-extrabold text-[var(--text)] no-underline shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97]"
        >
          {missionPage.ctaLabel}
        </Link>
      </div>
    </section>
  );
}

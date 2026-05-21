"use client";

import Link from "next/link";
import { customApproachSection, openExternalTab } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/utils";

const FILLED_STEP_COUNT = 3;

export default function CustomApproachCare() {
  const headerRef = useScrollReveal();
  const { kicker, headline, appDownloadLabel, appDownloadHref, steps } = customApproachSection;

  return (
    <section
      id="custom-approach"
      className="scroll-mt-[120px] border-b border-[var(--border)] bg-[var(--bg)] pt-10 pb-20 md:pt-12 md:pb-24"
    >
      <div className="mx-auto max-w-[720px] px-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--dim)]">
          {kicker}
        </p>
        <h2
          ref={headerRef}
          className="fade-up mb-6 font-serif text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-[var(--text)]"
        >
          {headline}
        </h2>
        <p className="fade-up visible mb-14">
          <Link
            href={appDownloadHref}
            className="font-reading text-[15px] font-medium text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-[5px] transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
          >
            {appDownloadLabel}
          </Link>
        </p>

        <ol className="relative m-0 list-none p-0">
          {steps.map((step, index) => {
            const isFilled = step.num <= FILLED_STEP_COUNT;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.num}
                className={cn("relative grid grid-cols-[44px_1fr] gap-x-5", !isLast && "pb-12")}
              >
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[21px] top-[44px] bottom-0 w-px -translate-x-1/2 bg-[var(--border-hover)]"
                  />
                )}

                <span
                  aria-hidden
                  className={cn(
                    "relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums",
                    isFilled
                      ? "bg-[var(--text)] text-[var(--card)]"
                      : "border-2 border-[var(--text)] bg-[var(--bg)] text-[var(--text)]",
                  )}
                >
                  {step.num}
                </span>

                <div className="min-w-0 pt-1.5">
                  <h3 className="m-0 font-brand text-[clamp(17px,2vw,20px)] font-bold leading-snug text-[var(--text)]">
                    {step.title}
                  </h3>
                  {step.body && (
                    <p className="mt-3 font-reading text-[15px] leading-[1.68] text-[var(--muted)]">
                      {step.body}
                    </p>
                  )}
                  {step.bodySecondary && (
                    <p className="mt-3 font-reading text-[15px] leading-[1.68] text-[var(--muted)]">
                      {step.bodySecondary}
                    </p>
                  )}
                  {step.footnote && (
                    <p className="mt-3 font-reading text-[15px] leading-[1.68] text-[var(--muted)]">
                      {step.footnote.beforeLink}
                      <Link
                        href={step.footnote.href}
                        {...(step.footnote.href.startsWith("http") ? openExternalTab : {})}
                        className="font-medium text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-[4px] transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                      >
                        {step.footnote.linkLabel}
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

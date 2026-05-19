"use client";

import { useEffect, useRef, useState } from "react";
import { businessPartnership } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/utils";

const STEP_COUNT = businessPartnership.steps.length;
const LAST_INDEX = STEP_COUNT - 1;

export default function BusinessPartnership() {
  const headerRef = useScrollReveal();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="b2b-how" className="overflow-hidden bg-[var(--bg)] py-24 scroll-mt-[120px] md:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          {businessPartnership.kicker}
        </p>
        <h2
          ref={headerRef}
          className="fade-up mx-auto mb-4 max-w-[720px] text-center font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em]"
        >
          {businessPartnership.headline}
        </h2>
        <p className="fade-up visible mx-auto mb-14 max-w-[600px] text-center font-reading text-[15px] font-light leading-[1.65] text-[var(--muted)]">
          {businessPartnership.subhead}
        </p>

        <div ref={timelineRef}>
          <ol
            className={cn(
              "relative m-0 grid list-none gap-6",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5",
            )}
          >
            {businessPartnership.steps.map((step, i) => (
              <li
                key={step.num}
                className={cn(
                  "flex h-full min-w-0 flex-col",
                  "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  timelineVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                )}
                style={{ transitionDelay: timelineVisible ? `${0.12 + i * 0.1}s` : "0s" }}
              >
                {/* Node + milestone — centred in column */}
                <div className="flex flex-col items-center">
                  <div className="relative flex h-11 w-full items-center justify-center">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="absolute top-1/2 right-1/2 left-0 hidden h-[2px] -translate-y-1/2 bg-[var(--gate-intro-blue)] opacity-70 lg:block"
                      />
                    )}
                    {i < LAST_INDEX && (
                      <span
                        aria-hidden
                        className="absolute top-1/2 left-1/2 right-0 hidden h-[2px] -translate-y-1/2 bg-[var(--gate-intro-blue)] opacity-70 lg:block"
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--text)]",
                        "bg-[var(--gate-intro-blue)] font-brand text-sm font-extrabold text-[var(--text)]",
                        "shadow-[0_3px_0_0_var(--text)]",
                        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        timelineVisible ? "scale-100" : "scale-[0.85]",
                      )}
                      style={{ transitionDelay: timelineVisible ? `${0.08 + i * 0.1}s` : "0s" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <p className="mt-3 w-full text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {step.milestone}
                  </p>
                </div>

                {/* Card — full column width, equal height */}
                <article
                  className={cn(
                    "card-hover mt-5 flex w-full flex-1 flex-col rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-6 shadow-card",
                  )}
                >
                  <h3 className="mb-2.5 font-serif text-[17px] font-extrabold leading-snug tracking-[-0.02em] text-[var(--text)]">
                    {step.title}
                  </h3>
                  <p className="m-0 flex-1 font-reading text-[13px] leading-[1.68] text-[var(--muted)]">
                    {step.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>

          <p
            aria-hidden
            className={cn(
              "mt-6 text-center text-[11px] text-[var(--dim)] lg:hidden",
              "transition-opacity duration-500",
              timelineVisible ? "opacity-100" : "opacity-0",
            )}
          >
            Scroll down to see all {STEP_COUNT} steps
          </p>
        </div>
      </div>
    </section>
  );
}

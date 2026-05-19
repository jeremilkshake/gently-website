"use client";

import { businessPricingModel, bookingUrl, openExternalTab } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

function CheckSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 mt-[3px]">
      <circle cx="7" cy="7" r="7" fill="#2BA1FB" />
      <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BusinessPricingModel() {
  const ref = useScrollReveal();
  const { kicker, headline, subhead, tiers, footnote } = businessPricingModel;

  return (
    <section
      id="b2b-pricing"
      className="py-24 bg-[var(--bg)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-center mb-4 max-w-[700px] mx-auto"
        >
          {headline}
        </h2>
        <p className="fade-up visible font-reading text-[15px] text-[var(--muted)] text-center max-w-[640px] mx-auto mb-12 leading-[1.65] font-light">
          {subhead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[920px] mx-auto">
          {tiers.map((tier, i) => {
            const isOrg = i === 1;
            return (
              <div
                key={tier.audience}
                className={
                  "rounded-[20px] p-8 border-2 shadow-card flex flex-col " +
                  (isOrg
                    ? "border-[var(--accent)] bg-[var(--card)]"
                    : "border-[var(--border)] bg-[var(--card)]")
                }
              >
                <p className="text-[10px] uppercase tracking-[.14em] text-[var(--muted)] mb-2">
                  {tier.audience}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-[clamp(32px,4vw,46px)] font-extrabold tracking-[-0.03em] leading-none">
                    {tier.price}
                  </span>
                  <span className="font-reading text-[13px] text-[var(--muted)]">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="font-reading text-[13px] text-[var(--muted)] leading-[1.6] mb-6">
                  {tier.paidBy}
                </p>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckSmall />
                      <span className="font-reading text-[13.5px] text-[var(--text)] leading-[1.55]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {isOrg && (
                  <a
                    href={bookingUrl}
                    {...openExternalTab}
                    className="font-nunito font-extrabold rounded-xl px-5 py-3 text-center text-[13px] uppercase tracking-[0.1em] border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
                  >
                    Become a Partner
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <p className="font-reading text-[12.5px] text-[var(--muted)] text-center max-w-[600px] mx-auto mt-8 leading-[1.6]">
          {footnote}
        </p>
      </div>
    </section>
  );
}

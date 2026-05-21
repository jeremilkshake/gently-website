"use client";

import ContactForm from "@/components/company/ContactForm";
import QuoteMark from "@/components/ui/QuoteMark";
import { contactPage } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactSection() {
  const ref = useScrollReveal();
  const { kicker, headline, quote } = contactPage;

  return (
    <section className="min-h-[calc(100dvh-var(--header-nav-h))] lg:grid lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-[var(--bg)] px-6 py-16 pt-[calc(var(--header-nav-h)+2.5rem)] lg:min-h-[calc(100dvh-var(--header-nav-h))] lg:px-12 lg:py-20 lg:pt-[calc(var(--header-nav-h)+3rem)]">
        <div>
          <p className="font-reading mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[var(--accent)]">
            {kicker}
          </p>
          <h1
            ref={ref}
            className="fade-up font-serif max-w-[520px] text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          >
            {headline}
          </h1>
        </div>

        <blockquote className="fade-up visible mt-16 max-w-[440px] lg:mt-0">
          <QuoteMark variant="typographic" className="-ml-0.5 mb-0 leading-none" />
          <p className="font-reading -mt-3 m-0 text-[clamp(16px,1.8vw,18px)] font-light leading-[1.65] text-[var(--muted)]">
            {quote.text}
          </p>
          <footer className="font-reading mt-5 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--dim)]">
            {quote.attribution}
          </footer>
        </blockquote>
      </div>

      <div className="relative flex items-center justify-center px-6 py-16 lg:px-10 lg:py-20">
        <FormPanelBackground />
        <div className="relative w-full max-w-[480px] rounded-2xl bg-[var(--card)] p-8 shadow-[var(--shadow-float)] md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function FormPanelBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[var(--text)]"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 90% 70% at 20% 40%, rgba(43, 161, 251, 0.14) 0%, transparent 65%)",
          "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79, 117, 104, 0.12) 0%, transparent 60%)",
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.02) 3px)",
        ].join(", "),
      }}
    />
  );
}

"use client";

import { Logo } from "@/components/ui/Logo";

// Brand blues + yellows from gently design system
const STEPS = [
  { label: "Your Care Plan", task: "Register the Death",  dot: "#1CB0F6" },
  { label: "The Funeral",    task: "Contact Funeral Home", dot: "#2BA1FB" },
  { label: "Estate & Will",  task: "Distribute Assets",    dot: "#FFD12B", darkCheck: true },
];

function Check({ color }: { color: string }) {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M1 4L3.8 7L9 1"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BeforeAfter() {
  return (
    <section
      id="before-after"
      className="py-20 bg-[var(--bg-2)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-2">
            The difference
          </p>
          <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
            Before and after{" "}
            <em className="italic text-[var(--accent)]">gently.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* ── LEFT: BEFORE ── */}
          <div className="relative rounded-[24px] bg-[var(--bg-3)] overflow-hidden min-h-[540px] p-8 flex flex-col">

            <p className="text-[9px] uppercase tracking-[.18em] text-[var(--dim)] mb-1.5">Before</p>
            <h3 className="font-serif text-[32px] font-extrabold text-[var(--text)] leading-[1.05]">
              Overwhelmed.
            </h3>
            <p className="text-[15px] text-[var(--dim)] mt-0.5 mb-6">Alone. Confused.</p>

            {/* Chaos cards — fixed-height stage */}
            <div className="relative flex-1 min-h-[260px]">

              {/* Probate form */}
              <div className="absolute top-0 left-0 bg-white rounded-[12px] border-2 border-[var(--border)] p-3 w-[148px] shadow-card -rotate-2 z-10">
                <p className="text-[8px] uppercase tracking-[.12em] text-[var(--dim)] mb-1">Probate Form</p>
                <p className="text-[12px] font-semibold text-[var(--text)] leading-snug">
                  Which office<br />do I call?
                </p>
                <p className="text-[8px] text-[var(--dim)] mt-2">Form IHT400 · Section 7b</p>
              </div>

              {/* Death certificate */}
              <div className="absolute top-1 right-0 bg-white rounded-[12px] border-2 border-[var(--border)] p-3 w-[145px] shadow-card rotate-[2.5deg] z-10">
                <p className="text-[8px] uppercase tracking-[.1em] text-[var(--dim)] mb-1">Copy 4 of 12</p>
                <p className="text-[13px] font-semibold text-[var(--text)] leading-snug">Death<br />Certificate</p>
                <p className="text-[8px] text-[#d14040] mt-1.5">Required everywhere.</p>
              </div>

              {/* Sticky note */}
              <div className="absolute top-[105px] left-1 bg-[#fef4c0] rounded-[10px] p-3 w-[132px] shadow-sm rotate-[1deg] z-20">
                <p className="text-[11px] font-semibold text-[#7a5500] leading-snug">&ldquo;Please hold…&rdquo;</p>
                <p className="text-[9px] text-[#7a5500]/70 mt-1 leading-snug">
                  Call back tomorrow.<br />Try a different dept.
                </p>
              </div>

              {/* PDF error */}
              <div className="absolute top-[96px] right-0 bg-white rounded-[12px] border-2 border-[var(--border)] p-3 w-[140px] shadow-card -rotate-[1.5deg] z-10">
                <div className="bg-[#ef4444] rounded-[6px] px-2 py-0.5 mb-2 inline-block">
                  <span className="text-white text-[9px] font-bold tracking-wide">PDF</span>
                </div>
                <p className="text-[9px] text-[var(--dim)] leading-snug">
                  Estate_Form_<br />FINAL_v12.pdf
                </p>
                <p className="text-[9px] font-medium text-[#ef4444] mt-1.5">Cannot open file</p>
              </div>

              {/* Wrong department pill */}
              <div className="absolute top-[208px] right-6 bg-[#fef2f2] border border-[#fca5a5] rounded-full px-3 py-1.5 z-20">
                <span className="text-[10px] font-medium text-[#dc2626]">Wrong department</span>
              </div>

              {/* 47 missed calls */}
              <div className="absolute bottom-14 left-0 bg-[var(--text)] rounded-full px-4 py-2 z-20">
                <span className="text-[11px] font-semibold text-[var(--bg)]">47 missed calls</span>
              </div>

              {/* Which form chip */}
              <div className="absolute bottom-12 right-2 bg-[var(--bg-2)] rounded-full px-3 py-1.5 border border-[var(--border)] z-20">
                <span className="text-[10px] text-[var(--muted)]">Which form is this??</span>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-6">
              <p className="text-[12px] text-[var(--dim)] leading-snug">
                Old paperwork. Missed calls.<br />Confusion. Stress. Alone.
              </p>
              <span className="mt-4 inline-block bg-[var(--bg-2)] border border-[var(--border)] rounded-full px-4 py-2 text-[12px] text-[var(--dim)]">
                Without Gently
              </span>
            </div>
          </div>

          {/* ── RIGHT: WITH GENTLY ── */}
          <div className="relative rounded-[24px] bg-[var(--card)] overflow-hidden min-h-[540px] p-8 flex flex-col shadow-card">

            {/* Brand yellow glow circle — references the logo's yellow heart */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 380,
                height: 380,
                background: "radial-gradient(circle, rgba(255,209,43,0.22) 0%, rgba(253,187,48,0.08) 55%, transparent 75%)",
                right: -110,
                bottom: -110,
              }}
              aria-hidden="true"
            />

            {/* Real logo */}
            <div className="mb-5 relative">
              <Logo variant="nav" imageClassName="h-7 w-auto" />
            </div>

            <h3 className="font-serif text-[32px] font-extrabold text-[var(--text)] leading-[1.05] relative">
              At peace.
            </h3>
            <p className="text-[15px] text-[var(--dim)] mt-0.5 mb-6 relative">
              Guided every step.
            </p>

            {/* Step cards */}
            <div className="flex flex-col gap-2.5 relative">
              {STEPS.map((step) => (
                <div
                  key={step.task}
                  className="bg-white rounded-[14px] border-2 border-[var(--border)] px-4 py-3 flex items-center justify-between shadow-[0_2px_0_0_var(--border)]"
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[.12em] text-[var(--dim)] mb-0.5">
                      {step.label}
                    </p>
                    <p className="text-[13px] font-semibold text-[var(--text)]">{step.task}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: step.dot }}
                    />
                    <div
                      className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: step.dot, background: step.darkCheck ? step.dot : "transparent" }}
                    >
                      <Check color={step.darkCheck ? "#1c1914" : step.dot} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats pills */}
            <div className="flex gap-2.5 mt-5 flex-wrap relative">
              <span className="bg-[var(--text)] text-[var(--bg)] rounded-full px-4 py-2 text-[12px] font-semibold">
                20 hours saved
              </span>
              <span className="rounded-full px-4 py-2 text-[12px] font-semibold text-white" style={{ background: "var(--green)" }}>
                £2,569+ saved
              </span>
            </div>

            {/* Footer */}
            <div className="mt-6 relative">
              <p className="text-[12px] text-[var(--dim)] leading-snug">
                Modern, professional, and grounded in personalised care.<br />
                We&apos;re by your side, every step of the way.
              </p>
              <span
                className="mt-4 inline-block rounded-full px-4 py-2 text-[12px] font-semibold"
                style={{ background: "#FFD12B", color: "#1c1914" }}
              >
                With Gently
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

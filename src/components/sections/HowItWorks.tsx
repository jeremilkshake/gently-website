"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    num: 1,
    title: "Match with a Care Manager",
    body: "Answer a few questions so we can understand your situation. A dedicated Care Manager will work with you and your family to provide tailored support and expert guidance from day one.",
  },
  {
    num: 2,
    title: "Get a step-by-step plan",
    body: "Your Care Manager maps out exactly what needs to happen — from registering the death to closing accounts. You always know what's next, and nothing falls through the cracks.",
  },
  {
    num: 3,
    title: "Handle the logistics",
    body: "We coordinate with banks, solicitors, HMRC, and utility providers on your behalf. Letters get drafted, calls get made, and paperwork gets filed — without you chasing anyone.",
  },
  {
    num: 4,
    title: "Delegate and share tasks",
    body: "Bring in family members or a trusted friend. Assign tasks, track progress, and keep everyone aligned — no group chats, no confusion, no one asking 'who's doing what'.",
  },
  {
    num: 5,
    title: "Tend to emotional needs",
    body: "Grief doesn't wait for the admin to be finished. Our science-backed wellbeing courses are built for the 3am moments as much as the office-hours ones.",
  },
  {
    num: 6,
    title: "Access ongoing support",
    body: "Your Care Manager stays with you for as long as you need. Whether that's a week or eighteen months — gently is there for the long tail of loss.",
  },
];

const EASE = [0.22, 0.94, 0.32, 1] as const;

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4L3.8 7L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const step = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
      setActiveStep(step);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-[var(--bg)]"
      style={{ height: `${(STEPS.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12">

        {/* Section header */}
        <div className="max-w-[560px] w-full mb-8 flex-shrink-0">
          <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-2">
            How it works
          </p>
          <h2 className="font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
            Six steps to{" "}
            <em className="italic text-[var(--accent)]">peace of mind.</em>
          </h2>
        </div>

        {/* Card stack */}
        <div className="max-w-[560px] w-full flex flex-col">

          {/* Condensed past steps */}
          <AnimatePresence initial={false}>
            {STEPS.slice(0, activeStep).map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 py-2.5 border-b border-[var(--border)]">
                  <span className="w-5 h-5 rounded-full bg-[#1CB0F6] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                    <CheckIcon />
                  </span>
                  <span className="text-[13px] text-[var(--dim)] font-medium">
                    {step.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Active step card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="mt-3 bg-[var(--card)] border-2 border-[var(--border)] rounded-[18px] p-6 shadow-card"
            >
              {/* Step number badge */}
              <div className="flex items-start gap-4">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-semibold flex-shrink-0 text-white"
                  style={{ background: "#2BA1FB" }}
                >
                  {activeStep + 1}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-[var(--text)] leading-snug mb-2">
                    {STEPS[activeStep].title}
                  </p>
                  <p className="font-reading text-[14px] text-[var(--muted)] leading-[1.68]">
                    {STEPS[activeStep].body}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Upcoming steps — dimmed preview */}
          {activeStep < STEPS.length - 1 && (
            <div className="mt-2 opacity-35">
              {STEPS.slice(activeStep + 1, activeStep + 3).map((step) => (
                <div
                  key={step.num}
                  className="flex items-center gap-3 py-2.5 border-b border-[var(--border)]"
                >
                  <span className="w-5 h-5 rounded-full border border-[var(--border)] flex items-center justify-center text-[10px] font-semibold text-[var(--dim)] flex-shrink-0">
                    {step.num}
                  </span>
                  <span className="text-[13px] text-[var(--muted)] font-medium">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="max-w-[560px] w-full mt-8 flex gap-1.5 flex-shrink-0">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-all duration-500"
              style={{
                background:
                  i < activeStep
                    ? "#1CB0F6"
                    : i === activeStep
                    ? "#2BA1FB"
                    : "var(--bg-3)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

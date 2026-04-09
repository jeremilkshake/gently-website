"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Clock } from "lucide-react";
import { compareSupportCopy } from "@/lib/content";

// ─── Content ────────────────────────────────────────────────────────────────

const WITHOUT = [
  { title: "Scour the internet at 2am",        body: `Google "what to do when someone dies" and fall into a rabbit hole of conflicting advice, outdated gov pages, and forum posts.` },
  { title: "Hunt for the death certificate",    body: `Someone mentions you need a death certificate — you don't know where to get it, how many you need, or why everyone keeps asking for "original copies."` },
  { title: "Race to register in time",          body: `Get told to "register the death within 5 days" while you're still in shock.` },
  { title: "Get redirected twice over",         body: `Call one office, get sent to another, then told to book an appointment. Next available slot: days away.` },
  { title: "Make decisions in shock",           body: `Funeral directors asking for burial vs cremation, coffin types, and service details before you've even processed what's happened.` },
  { title: "Guess at every price",              body: `Prices are opaque, comparisons awkward, and everything feels urgent and expensive.` },
  { title: "Repeat yourself 15 times",          body: `Every bank, insurer, and provider asks you to "just let us know" — which means repeating the same conversation 15+ times.` },
  { title: "Hunt for account details",          body: `Get asked for account numbers, policy details, and documents you've never seen before.` },
  { title: "Dig through every drawer",          body: `Spend hours digging through drawers, emails, and old paperwork trying to figure out what even exists.` },
  { title: "Miss what you don't know",          body: `Constantly wondering: "Am I missing something important?" — with no way to check.` },
  { title: "Discover debts months later",       body: `Subscriptions, accounts, or debts surface months later that no one told you about.` },
  { title: "Decode probate jargon",             body: `Try to understand probate — immediately hit with legal jargon, forms, and thresholds that make no sense.` },
  { title: "Guess if probate applies",          body: `Not sure if you even need probate, but afraid of getting it wrong.` },
  { title: "Untangle inheritance tax",          body: `Inheritance tax rules feel like a puzzle with huge consequences if misunderstood.` },
  { title: "Guess what a solicitor costs",      body: `Consider hiring a solicitor, but have no idea what's reasonable on cost or scope.` },
  { title: "Watch family chats unravel",        body: `Group chats start politely… then slowly unravel into tension, disagreement, or silence.` },
  { title: "Miss who owns each task",           body: `Unclear who is responsible for what — executor? next of kin? everyone? no one?` },
  { title: "Lose track of every call",          body: `Keep a mental checklist of who you've contacted — and inevitably lose track.` },
  { title: "Wait on hold. A lot.",              body: `Get put on hold. A lot.` },
  { title: "Resend the same documents",         body: `Send documents. Get asked to resend them.` },
  { title: "Wait weeks for answers",            body: `Wait weeks for responses that raise more questions than they answer.` },
  { title: "Track everything manually",         body: `No single place shows progress — everything lives across letters, emails, and memory.` },
  { title: "Organise grief support alone",      body: `Try to find a grief counsellor, but it feels like "one more thing to organise."` },
  { title: "Get ambushed by admin again",       body: `Admin tasks keep resurfacing just as you start to emotionally stabilise.` },
  { title: "Lose weekends to paperwork",        body: `Weekends disappear into paperwork instead of rest and recovery.` },
  { title: "Finally, somehow, done.",           body: `The whole process feels isolating, bureaucratic, and quietly overwhelming — and it took over a year.` },
];

const WITH = [
  { num: 1, title: "Match with a Care Manager", body: "Answer a few questions so we understand your situation. A dedicated Care Manager works with you and your family from day one." },
  { num: 2, title: "Get a step-by-step plan",   body: "Your Care Manager maps out exactly what needs to happen — from registering the death to closing accounts. Always know what's next." },
  { num: 3, title: "Handle the logistics",      body: "We coordinate with banks, solicitors, HMRC, and providers on your behalf. Letters drafted, calls made, paperwork filed." },
  { num: 4, title: "Delegate and share tasks",  body: "Bring in family or a trusted friend. Assign tasks, track progress, keep everyone aligned — no group chat chaos." },
  { num: 5, title: "Tend to emotional needs",   body: "Science-backed wellbeing courses built for the 3am moments — grief support alongside the admin, not saved for later." },
  { num: 6, title: "Access ongoing support",    body: "Your Care Manager stays as long as you need. A week or eighteen months — gently is there for the long tail of loss." },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const L    = WITHOUT.length; // 26
const R    = WITH.length;    // 6
const EASE = [0.22, 0.94, 0.32, 1] as const;
const WINDOW_PAST = 3;       // condensed past rows visible before "+N more"
const END_HOLD_STEPS = 6;    // extra linger at final state

// Right "finishes" when leftStep reaches R (step 7 = ~23% scroll)
// → user then scrolls through 20 more painful left steps while right shows "Done"
const RIGHT_DONE_STEP = R; // leftStep index at which right is considered complete

// ─── Icons ───────────────────────────────────────────────────────────────────

function CheckFilled({ color = "#1c1914" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill={color} />
      <path d="M5 9L7.8 12L13 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckEmpty({ color = "var(--border-hover)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true" className="flex-shrink-0">
      <path d="M7 12C7 12 1 8.5 1 4.5C1 2.567 2.567 1 4.5 1C5.613 1 6.605 1.52 7 2.3C7.395 1.52 8.387 1 9.5 1C11.433 1 13 2.567 13 4.5C13 8.5 7 12 7 12Z" fill="#2BA1FB" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CompareScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isFastScrolling, setIsFastScrolling] = useState(false);
  const lastSampleRef = useRef({ progress: 0, t: 0 });
  const blurTimeoutRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (next) => {
      setProgress(next);

      const now = performance.now();
      const prev = lastSampleRef.current;
      if (prev.t !== 0) {
        const dp = Math.abs(next - prev.progress);
        const dt = now - prev.t;
        const speed = dt > 0 ? dp / dt : 0;

        // High-speed scroll: briefly blur the "Without Gently" stream.
        if (speed > 0.0012) {
          setIsFastScrolling(true);
          if (blurTimeoutRef.current) window.clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = window.setTimeout(() => {
            setIsFastScrolling(false);
            blurTimeoutRef.current = null;
          }, 140);
        }
      }

      lastSampleRef.current = { progress: next, t: now };
    });

    return () => {
      unsubscribe();
      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
    };
  }, [scrollYProgress]);

  // Both driven by the same virtual timeline; include an end hold.
  const totalSteps  = L + END_HOLD_STEPS;
  const rawStep     = Math.floor(progress * totalSteps);
  const leftStep    = Math.min(L - 1, rawStep);
  const leftActive  = Math.min(L - 1, leftStep);
  const rightStep   = Math.min(R, leftStep);        // right completes at leftStep = R
  const rightActive = Math.min(R - 1, rightStep);
  const rightDone   = leftStep >= RIGHT_DONE_STEP;
  const leftDone    = leftStep >= L - 1;

  // Left climbs 0 → 400 over the full scroll
  const leftHours = Math.round(progress * 400);
  // Right reaches 300 exactly when gently finishes step 6 (~23% scroll), then holds
  const rightSaved = Math.min(300, Math.round((leftStep / RIGHT_DONE_STEP) * 300));

  // Windowed past for left (keep last WINDOW_PAST rows)
  const lPastEnd   = leftActive;
  const lPastStart = Math.max(0, lPastEnd - WINDOW_PAST);
  const lHidden    = lPastStart;

  // Right has only 6 items — show all past (max 5)
  const rPastEnd   = rightDone ? R : rightActive;
  const rPastStart = 0;

  return (
    <section
      id="compare"
      ref={containerRef}
      className="relative bg-[var(--bg-2)]"
      /* steps × 220px (plus end hold) + 100vh so sticky enters/exits cleanly */
      style={{ height: `calc(${totalSteps * 220}px + 100vh)` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden py-8 px-6">

        {/* ── Section header ── */}
        <div className="max-w-content mx-auto w-full mb-5 text-center flex-shrink-0">
          <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-2">The difference</p>
          <h2 className="font-serif text-[clamp(22px,2.8vw,38px)] font-light tracking-[-0.02em] text-[var(--text)] leading-[1.25]">
            {compareSupportCopy.line1}
            <br />
            {compareSupportCopy.line2}
          </h2>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--muted)]">
            Before and after{" "}
            <em className="italic text-[var(--accent)]">gently.</em>
          </p>
        </div>

        {/* ── Two columns ── */}
        <div className="max-w-content mx-auto w-full grid grid-cols-2 gap-4 flex-1 min-h-0">

          {/* ════ LEFT — Without Gently ════ */}
          <div className="flex flex-col min-h-0 rounded-[18px] overflow-hidden border-2 border-[rgba(28,25,20,0.14)] shadow-[0_2px_0_0_rgba(28,25,20,0.14)]">

            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5 min-h-[64px] flex-shrink-0"
              style={{ background: "#1c1914" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[14px] font-semibold text-white tracking-[-0.01em]">
                  Without Gently
                </span>
                {leftDone && (
                  <span className="text-[10px] font-medium text-white/60 bg-white/10 rounded-full px-2.5 py-1">
                    Finally Done
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={leftHours}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  className="text-[22px] font-bold text-white tabular-nums leading-none"
                >
                  {leftDone ? "400+" : `${leftHours}+`}
                </motion.span>
                <span className="text-[10px] text-white/45">hrs</span>
              </div>
            </div>

            {/* Step list */}
            <div
              className={`flex-1 bg-white flex flex-col overflow-hidden px-3 py-3 transition-[filter,opacity] duration-150 ${
                isFastScrolling ? "blur-[1.8px] opacity-85" : "blur-0 opacity-100"
              }`}
            >

              {/* Hidden count */}
              {lHidden > 0 && (
                <div className="px-2 py-1 text-[10px] text-[var(--dim)]">
                  +{lHidden} completed
                </div>
              )}

              {/* Condensed past rows */}
              <AnimatePresence initial={false}>
                {WITHOUT.slice(lPastStart, lPastEnd).map((item, idx) => (
                  <motion.div
                    key={lPastStart + idx}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 0.45, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 px-2 py-[9px] border-b border-[var(--border-subtle)]">
                      <Clock size={11} className="text-[var(--dim)] flex-shrink-0" />
                      <span className="text-[12.5px] text-[var(--dim)] font-medium flex-1 truncate">
                        {lPastStart + idx + 1}. {item.title}
                      </span>
                      <CheckFilled color="#1c1914" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Active step card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={leftActive}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="mx-0.5 mt-2 mb-1 rounded-[12px] border-2 border-[rgba(28,25,20,0.12)] bg-white shadow-[0_2px_0_0_rgba(28,25,20,0.12)] flex-1 flex flex-col"
                >
                  <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
                    <Clock size={14} className="text-[var(--muted)] flex-shrink-0" />
                    <span className="text-[15px] font-semibold text-[var(--text)] flex-1 leading-snug">
                      {leftActive + 1}. {WITHOUT[leftActive].title}
                    </span>
                    <CheckEmpty />
                  </div>
                  <p className="text-[13px] text-[var(--muted)] leading-[1.7] px-4 pb-5 flex-1" style={{ paddingLeft: "42px" }}>
                    {WITHOUT[leftActive].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Upcoming preview */}
              {!leftDone && (
                <div className="opacity-30 flex-shrink-0">
                  {WITHOUT.slice(leftActive + 1, leftActive + 4).map((item, idx) => (
                    <div
                      key={leftActive + 1 + idx}
                      className="flex items-center gap-2.5 px-2 py-[7px] border-b border-[var(--border-subtle)]"
                    >
                      <Clock size={11} className="text-[var(--dim)] flex-shrink-0" />
                      <span className="text-[12.5px] text-[var(--muted)] flex-1 truncate">
                        {leftActive + 2 + idx}. {item.title}
                      </span>
                      <CheckEmpty color="#ddd" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* ════ RIGHT — With Gently ════ */}
          <div className="flex flex-col min-h-0 rounded-[18px] overflow-hidden border-2 border-[#7BC9EF] shadow-[0_2px_0_0_#7BC9EF]">

            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
              style={{ background: "#77d0fa" }}
            >
              <div className="flex items-center gap-2.5">
                <Logo variant="nav" imageClassName="h-[36px] w-auto" />
                {rightDone && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ background: "#FFD12B", color: "#1c1914" }}
                  >
                    ⚡ Done
                  </motion.span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] text-white/45">Save</span>
                <motion.span
                  key={rightSaved}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  className="text-[22px] font-bold text-white tabular-nums leading-none"
                >
                  {rightSaved >= 300 ? "300+" : `${rightSaved}`}
                </motion.span>
                <span className="text-[10px] text-white/45">hrs</span>
              </div>
            </div>

            {/* Step list */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden px-3 py-3">

              {/* Condensed past steps (all visible — max 5) */}
              <AnimatePresence initial={false}>
                {WITH.slice(rPastStart, rPastEnd).map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 0.55, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 px-2 py-[9px] border-b border-[var(--border-subtle)]">
                      <HeartIcon />
                      <span className="text-[12.5px] text-[var(--dim)] font-medium flex-1 truncate">
                        {step.num}. {step.title}
                      </span>
                      <CheckFilled color="#1CB0F6" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Active step card or "All Done" state */}
              <AnimatePresence mode="wait">
                {rightDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mx-0.5 mt-2 rounded-[12px] flex-1 flex flex-col justify-center p-6"
                    style={{ background: "rgba(43,161,251,0.05)", border: "1.5px solid #BBE9FF" }}
                  >
                    <HeartIcon />
                    <p className="text-[17px] font-semibold text-[var(--text)] mt-4 mb-3 leading-snug">
                      Now you can focus on healing.
                    </p>
                    <ul className="text-[13px] text-[var(--muted)] leading-[1.65] space-y-1.5 list-none p-0 m-0">
                      <li>The paperwork is handled.</li>
                      <li>The calls are made.</li>
                      <li>The plan is in place.</li>
                      <li className="pt-1 text-[var(--text)]">You don&apos;t have to carry the admin alone.</li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key={rightActive}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="mx-0.5 mt-2 mb-1 rounded-[12px] flex-1 flex flex-col overflow-hidden shadow-[0_2px_8px_rgba(43,161,251,0.1)]"
                    style={{ background: "rgba(43,161,251,0.04)", border: "1.5px solid #BBE9FF" }}
                  >
                    <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                        style={{ background: "#2BA1FB" }}
                      >
                        {rightActive + 1}
                      </span>
                      <span className="text-[15px] font-semibold text-[var(--text)] flex-1 leading-snug">
                        {WITH[rightActive].title}
                      </span>
                      <CheckEmpty color="#BBE9FF" />
                    </div>
                    <p className="text-[13px] text-[var(--muted)] leading-[1.7] px-4 pb-5 flex-1" style={{ paddingLeft: "47px" }}>
                      {WITH[rightActive].body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upcoming steps */}
              {!rightDone && rightActive < R - 1 && (
                <div className="opacity-28 flex-shrink-0">
                  {WITH.slice(rightActive + 1, rightActive + 4).map((step) => (
                    <div
                      key={step.num}
                      className="flex items-center gap-2.5 px-2 py-[7px] border-b border-[var(--border-subtle)]"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border flex-shrink-0"
                        style={{ borderColor: "#BBE9FF" }}
                      />
                      <span className="text-[12.5px] text-[var(--muted)] flex-1 truncate">
                        {step.num}. {step.title}
                      </span>
                      <CheckEmpty color="#BBE9FF" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ── Progress bar — 26 segments ── */}
        <div className="max-w-content mx-auto w-full mt-3.5 flex gap-[2px] flex-shrink-0">
          {WITHOUT.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 rounded-full transition-colors duration-150"
              style={{
                background:
                  i < leftActive
                    ? "var(--dim)"
                    : i === leftActive
                    ? "var(--text)"
                    : "var(--bg-3)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

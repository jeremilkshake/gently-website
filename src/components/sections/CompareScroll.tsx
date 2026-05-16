"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Clock } from "lucide-react";
import { useIsBusiness } from "@/lib/audienceContext";
import { compareSupportCopy } from "@/lib/content";

// ─── Content ────────────────────────────────────────────────────────────────

const WITHOUT = [
  { title: "Scour the internet at 2am",        body: `Google "what to do when someone dies" and fall into a rabbit hole of conflicting advice, outdated gov pages, and forum posts.` },
  { title: "Hunt for the death certificate",    body: `Someone mentions you need a death certificate, and you don't know where to get it, how many you need, or why everyone keeps asking for "original copies."` },
  { title: "Race to register in time",          body: `Get told to "register the death within 5 days" while you're still in shock.` },
  { title: "Get redirected twice over",         body: `Call one office, get sent to another, then told to book an appointment. Next available slot: days away.` },
  { title: "Make decisions in shock",           body: `Funeral directors asking for burial vs cremation, coffin types, and service details before you've even processed what's happened.` },
  { title: "Guess at every price",              body: `Prices are opaque, comparisons awkward, and everything feels urgent and expensive.` },
  { title: "Repeat yourself 15 times",          body: `Every bank, insurer, and provider asks you to "just let us know," which means repeating the same conversation 15+ times.` },
  { title: "Hunt for account details",          body: `Get asked for account numbers, policy details, and documents you've never seen before.` },
  { title: "Dig through every drawer",          body: `Spend hours digging through drawers, emails, and old paperwork trying to figure out what even exists.` },
  { title: "Miss what you don't know",          body: `Constantly wondering: "Am I missing something important?", with no way to check.` },
  { title: "Discover debts months later",       body: `Subscriptions, accounts, or debts surface months later that no one told you about.` },
  { title: "Decode probate jargon",             body: `Try to understand probate, and immediately hit with legal jargon, forms, and thresholds that make no sense.` },
  { title: "Guess if probate applies",          body: `Not sure if you even need probate, but afraid of getting it wrong.` },
  { title: "Untangle inheritance tax",          body: `Inheritance tax rules feel like a puzzle with huge consequences if misunderstood.` },
  { title: "Guess what a solicitor costs",      body: `Consider hiring a solicitor, but have no idea what's reasonable on cost or scope.` },
  { title: "Watch family chats unravel",        body: `Group chats start politely… then slowly unravel into tension, disagreement, or silence.` },
  { title: "Miss who owns each task",           body: `Unclear who is responsible for what: executor? next of kin? everyone? no one?` },
  { title: "Lose track of every call",          body: `Keep a mental checklist of who you've contacted, and inevitably lose track.` },
  { title: "Wait on hold. A lot.",              body: `Get put on hold. A lot.` },
  { title: "Resend the same documents",         body: `Send documents. Get asked to resend them.` },
  { title: "Wait weeks for answers",            body: `Wait weeks for responses that raise more questions than they answer.` },
  { title: "Track everything manually",         body: `No single place shows progress, and everything lives across letters, emails, and memory.` },
  { title: "Organise grief support alone",      body: `Try to find a grief counsellor, but it feels like "one more thing to organise."` },
  { title: "Get ambushed by admin again",       body: `Admin tasks keep resurfacing just as you start to emotionally stabilise.` },
  { title: "Lose weekends to paperwork",        body: `Weekends disappear into paperwork instead of rest and recovery.` },
  { title: "Finally, somehow, done.",           body: `The whole process feels isolating, bureaucratic, and quietly overwhelming, and it took over a year.` },
];

const WITH = [
  { num: 1, title: "Match with a Care Manager", body: "Answer a few questions so we understand your situation. A dedicated Care Manager works with you and your family from day one." },
  { num: 2, title: "Get a step-by-step plan",   body: "Your Care Manager maps out exactly what needs to happen, from registering the death to closing accounts. Always know what's next." },
  { num: 3, title: "Handle the logistics",      body: "We coordinate with banks, solicitors, HMRC, and providers on your behalf. Letters drafted, calls made, paperwork filed." },
  { num: 4, title: "Delegate and share tasks",  body: "Bring in family or a trusted friend. Assign tasks, track progress, keep everyone aligned, with no group chat chaos." },
  { num: 5, title: "Tend to emotional needs",   body: "Science-backed wellbeing courses built for the 3am moments, with grief support alongside the admin, not saved for later." },
  { num: 6, title: "Access ongoing support",    body: "Your Care Manager stays as long as you need. A week or eighteen months, gently is there for the long tail of loss." },
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

/** Title block scrolls away first; step progress stays 0 until past this (matches intro min-height). */
const COMPARE_TITLE_SCROLL_PX = 300;

function compareScrollProgress(rect: DOMRect) {
  const viewportH = window.innerHeight;
  const scrollable = Math.max(1, rect.height - viewportH);
  const y = -rect.top;
  if (y <= COMPARE_TITLE_SCROLL_PX) return 0;
  const denom = scrollable - COMPARE_TITLE_SCROLL_PX;
  if (denom <= 1) return 1;
  return Math.min(1, Math.max(0, (y - COMPARE_TITLE_SCROLL_PX) / denom));
}

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
  const isBiz = useIsBusiness();
  const compareLines = isBiz ? compareSupportCopy.business : compareSupportCopy.individual;

  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const el = containerRef.current;
    if (!el) return;
    setProgress(compareScrollProgress(el.getBoundingClientRect()));
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setProgress(compareScrollProgress(el.getBoundingClientRect()));
  }, []);

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
      className="relative scroll-mt-[120px] bg-[var(--bg-2)]"
      /* Title block + scroll track (+100vh so sticky exits cleanly) */
      style={{
        height: `calc(${COMPARE_TITLE_SCROLL_PX}px + ${totalSteps * 280}px + 100vh)`,
      }}
    >
      {/* Intro — scrolls away; not inside sticky so compare can use full viewport */}
      <div
        className="mx-auto flex max-w-content flex-col justify-center px-6 pb-6 pt-14 text-center"
        style={{ minHeight: COMPARE_TITLE_SCROLL_PX }}
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">The difference</p>
        <h2 className="font-serif text-[clamp(22px,2.8vw,38px)] font-extrabold leading-[1.25] tracking-[-0.02em] text-[var(--text)]">
          {compareLines.line1}
          <br />
          {compareLines.line2}
        </h2>
        <p className="font-reading mt-2 text-[14px] leading-[1.6] text-[var(--muted)]">
          Before and after <em className="italic text-[var(--accent)]">gently.</em>
        </p>
      </div>

      {/* Sticky — cards + progress only; fills viewport while scrolling the compare track */}
      <div className="sticky top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden px-6 pb-4 pt-2">
        <div className="mx-auto grid min-h-0 w-full max-w-content flex-1 grid-cols-2 gap-4">

          {/* ════ LEFT — Without Gently ════ */}
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border-2 border-[rgba(28,25,20,0.14)] shadow-[0_2px_0_0_rgba(28,25,20,0.14)]">

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

            {/* Step list — scroll so long steps / “done” copy never clip */}
            <div className="font-reading flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white px-3 py-3">

              {/* Hidden count */}
              {lHidden > 0 && (
                <div className="px-2 py-1 text-[10px] text-[var(--dim)]">
                  +{lHidden} completed
                </div>
              )}

              {/* Condensed past rows — no height animation (avoids layout jank) */}
              {WITHOUT.slice(lPastStart, lPastEnd).map((item, idx) => (
                <div
                  key={`${lPastStart + idx}-${item.title}`}
                  className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] px-2 py-[9px] opacity-45"
                >
                  <Clock size={11} className="flex-shrink-0 text-[var(--dim)]" />
                  <span className="flex-1 truncate text-[12.5px] font-medium text-[var(--dim)]">
                    {lPastStart + idx + 1}. {item.title}
                  </span>
                  <CheckFilled color="#1c1914" />
                </div>
              ))}

              {/* Active step card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={leftActive}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.34, ease: EASE }}
                  className="mx-0.5 mt-2 mb-1 flex min-h-[12rem] flex-1 flex-col rounded-[12px] border-2 border-[rgba(28,25,20,0.12)] bg-white shadow-[0_2px_0_0_rgba(28,25,20,0.12)] sm:min-h-[14rem]"
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
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border-2 border-[#7BC9EF] shadow-[0_2px_0_0_#7BC9EF]">

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

            {/* Step list — scroll so 6 completed rows + “done” panel stay readable */}
            <div className="font-reading flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white px-3 py-3">

              {/* Condensed past steps — stable keys, no height animation */}
              {WITH.slice(rPastStart, rPastEnd).map((step) => (
                <div
                  key={step.num}
                  className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] px-2 py-[9px] opacity-55"
                >
                  <HeartIcon />
                  <span className="flex-1 truncate text-[12.5px] font-medium text-[var(--dim)]">
                    {step.num}. {step.title}
                  </span>
                  <CheckFilled color="#1CB0F6" />
                </div>
              ))}

              {/* Active step card or "All Done" state */}
              <AnimatePresence mode="wait">
                {rightDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.36, ease: EASE }}
                    className="mx-0.5 mt-2 mb-1 flex shrink-0 flex-col overflow-hidden rounded-[12px] shadow-[0_2px_8px_rgba(43,161,251,0.1)]"
                    style={{ background: "rgba(43,161,251,0.04)", border: "1.5px solid #BBE9FF" }}
                  >
                    <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                        style={{ background: "#2BA1FB" }}
                      >
                        {R + 1}
                      </span>
                      <span className="flex-1 text-[15px] font-semibold leading-snug text-[var(--text)]">
                        {compareLines.donePanelTitle}
                      </span>
                      <CheckFilled color="#1CB0F6" />
                    </div>
                    <p
                      className="flex-1 px-4 pb-5 text-[13px] leading-[1.7] text-[var(--muted)]"
                      style={{ paddingLeft: "47px" }}
                    >
                      {compareLines.donePanelBody}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={rightActive}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.34, ease: EASE }}
                    className="mx-0.5 mt-2 mb-1 flex min-h-[12rem] flex-1 flex-col overflow-hidden rounded-[12px] shadow-[0_2px_8px_rgba(43,161,251,0.1)] sm:min-h-[14rem]"
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

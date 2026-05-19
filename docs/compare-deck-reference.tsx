"use client";

/**
 * Q2Q-style scroll-pinned comparison deck.
 *
 * Self-contained: paste into any React/Next project that has gsap and Tailwind.
 * Tunables are at the top of the file. Two columns play independent timelines
 * mapped to a single pinned scroll. Cards stack with overlap; the latest card
 * sits on top and covers the previous card's body — the "Done" look is the
 * absence of body visibility, not a height change.
 *
 * Requires: gsap (^3) and Tailwind. No other deps.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── TUNABLES ──────────────────────────────────────────────────────────────

const PIN_LENGTH_PX = 4000;        // total scroll distance the section is pinned for
const SCRUB = 0.5;                 // 0 = instant, 1 = lazy follow
const AI_END_RATIO = 0.35;         // AI column finishes by this fraction of scroll
const CARD_STEP_PX = 60;           // vertical distance between consecutive card tops
const CARD_TITLE_PX = 60;          // title-row height
const CARD_BODY_PX = 84;           // description-block height
// Each card slides up by exactly one BODY-height during its entry. Cards start
// in their "future" position (i*STEP + BODY) where their body is covered by
// the next card's title — so the column always shows the whole list with only
// the active card's body visible. As scroll progresses, each card translates
// up by BODY, collapsing the previous card and expanding itself.
// CARD_STEP_PX is also the title-row height — they MUST match so consecutive
// titles sit flush with no gap.
const HEADER_PX = 64;              // sticky header height
const HEADER_TOP_PX = 16;          // distance from viewport top when sticky

// ─── DATA ──────────────────────────────────────────────────────────────────

type Step = { title: string; body: string };

const MANUAL_STEPS: Step[] = [
  { title: "Scour industry reports", body: "Manually dig through generic databases and Google search to identify niche industries that fit your thesis." },
  { title: 'Build "The Spreadsheet"', body: "Copy-paste company names, URLs, and locations into a massive, static Excel sheet." },
  { title: "Hunt for owners", body: "Spend hours cross-referencing LinkedIn and corporate registries to find the actual owner." },
  { title: "Manual quality checks", body: "Check headcount and revenue estimates one-by-one to ensure companies actually meet your investment criteria." },
  { title: "Draft generic outreach", body: "Write templates that feel impersonal, struggling to mention specific business factors that grab an owner's attention." },
  { title: "Guess email patterns", body: 'Waste time testing "firstname.lastname@" variations, leading to high bounce rates and domain reputation risk.' },
  { title: "Miss inbound signals", body: "Sellers visit your website to learn more, but you have no way of knowing who they are or when they visited." },
  { title: "Manual follow-ups", body: "Try to remember who to nudge and when, often letting warm prospects slip through the cracks due to lack of tracking." },
  { title: "Tedious data entry", body: "Spend weekends manually updating status columns and logging activity." },
  { title: "First call finally booked", body: "After months of dealing with repetitive admin work, finally secure a single intro call." },
];

const AI_STEPS: Step[] = [
  { title: "Tell us your thesis", body: "Share the types of companies you want to buy. We research the space, confirm it's attractive, and find businesses that match your criteria." },
  { title: "We find the companies and contacts", body: "We draft custom emails for each company, or our AI agent can make the first call. You quickly approve messages before they're sent." },
  { title: "Approve personalized outreach", body: "Deploy hyper-personalized, multi-channel campaigns that adapt to the owner's profile and run while you sleep." },
  { title: "See meetings booked on your calendar", body: "As owners respond, we schedule the intro calls for you. Meetings appear on your calendar with notes prepared so you're ready to go." },
];

// One value per "this many cards done" state. Length must match step count.
const MANUAL_DAYS = [1, 1, 2, 3, 6, 9, 11, 12, 13, 14];
const AI_DAYS = [1, 2, 3, 3];

// ─── TIMELINE LOGIC ────────────────────────────────────────────────────────

type Range = { start: number; end: number };

function buildRanges(count: number, start: number, end: number): Range[] {
  const span = (end - start) / count;
  return Array.from({ length: count }, (_, i) => ({
    start: start + i * span,
    end: start + (i + 1) * span,
  }));
}

const MANUAL_RANGES = buildRanges(MANUAL_STEPS.length, 0, 1);
const AI_RANGES = buildRanges(AI_STEPS.length, 0, AI_END_RATIO);

function cardEntryT(p: number, range: Range): number {
  if (p <= range.start) return 0;
  if (p >= range.end) return 1;
  return (p - range.start) / (range.end - range.start);
}

function activeIndex(p: number, ranges: Range[]): number {
  let idx = -1;
  for (let i = 0; i < ranges.length; i++) if (p >= ranges[i].start) idx = i;
  return idx;
}

function completionPct(p: number, ranges: Range[]): number {
  const last = ranges[ranges.length - 1];
  if (p >= last.end) return 1;
  if (p <= ranges[0].start) return 0;
  return (p - ranges[0].start) / (last.end - ranges[0].start);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function daysValue(keyframes: number[], ranges: Range[], p: number): number {
  const idx = activeIndex(p, ranges);
  if (idx < 0) return keyframes[0];
  if (idx >= keyframes.length - 1) return keyframes[keyframes.length - 1];
  const t = cardEntryT(p, ranges[idx]);
  const from = idx === 0 ? keyframes[0] : keyframes[idx - 1];
  const to = keyframes[idx];
  return Math.round(from + (to - from) * easeOutCubic(t));
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function CompareDeck() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pinRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current!,
        start: "top top",
        end: `+=${PIN_LENGTH_PX}`,
        pin: true,
        scrub: SCRUB,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#EAF7F4]">
      <div ref={pinRef} className="min-h-screen px-6 pt-16">
        <h2 className="mx-auto mb-8 max-w-6xl text-center text-3xl font-extrabold leading-tight text-[#0e1414] md:text-5xl">
          Personalize your outreach.
          <br />
          Reclaim your time.
        </h2>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          <Column
            title="Manual Process"
            steps={MANUAL_STEPS}
            ranges={MANUAL_RANGES}
            progress={progress}
            days={daysValue(MANUAL_DAYS, MANUAL_RANGES, progress)}
            fillPct={completionPct(progress, MANUAL_RANGES)}
            doneLabel="Finally Done"
            doneBadgeClass="bg-white text-[#0e1414] border border-[#0e1414]/10"
            headerColor="#0e1414"
            iconType="clock"
          />
          <Column
            title="AI Deal Flow with Q2Q"
            steps={AI_STEPS}
            ranges={AI_RANGES}
            progress={progress}
            days={daysValue(AI_DAYS, AI_RANGES, progress)}
            fillPct={completionPct(progress, AI_RANGES)}
            doneLabel="⚡ Done"
            doneBadgeClass="bg-[#FCEA42] text-[#1c1c1c]"
            headerColor="#1d3624"
            iconType="sparkle"
          />
        </div>
      </div>
    </section>
  );
}

// ─── COLUMN ────────────────────────────────────────────────────────────────

type ColumnProps = {
  title: string;
  steps: Step[];
  ranges: Range[];
  progress: number;
  days: number;
  fillPct: number;
  doneLabel: string;
  doneBadgeClass: string;
  headerColor: string;
  iconType: "clock" | "sparkle";
};

function Column({
  title,
  steps,
  ranges,
  progress,
  days,
  fillPct,
  doneLabel,
  doneBadgeClass,
  headerColor,
  iconType,
}: ColumnProps) {
  const active = activeIndex(progress, ranges);
  const done = fillPct >= 0.999;
  const fillPctClamped = Math.max(0, Math.min(100, fillPct * 100));

  // Just tall enough to show every card at its resting position. Future cards'
  // bodies extend one BODY past this — clipped by overflow-hidden.
  const columnHeight =
    (steps.length - 1) * CARD_STEP_PX + CARD_TITLE_PX + CARD_BODY_PX;

  return (
    <div className="flex flex-col">
      <div
        className="sticky z-50 mb-4 flex items-center justify-between overflow-hidden rounded-2xl px-5 shadow-md"
        style={{
          top: HEADER_TOP_PX,
          height: HEADER_PX,
          background: `linear-gradient(to right, ${headerColor} ${fillPctClamped}%, #ffffff ${fillPctClamped}%)`,
          color: "white",
        }}
      >
        <h3
          className="z-10 text-lg font-extrabold md:text-xl"
          style={{ color: fillPctClamped > 30 ? "white" : "#0e1414" }}
        >
          {title}
        </h3>
        <div className="z-10 flex items-center gap-2">
          {done && (
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${doneBadgeClass}`}>
              {doneLabel}
            </span>
          )}
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-base font-bold tabular-nums text-[#0e1414]">
            {days}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: fillPctClamped > 70 ? "rgba(255,255,255,0.7)" : "#5a7894" }}
          >
            Days
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: columnHeight }}>
        {steps.map((step, i) => {
          // Each card has its own scroll range during which it slides up by
          // one BODY-height (collapsing the previous card and exposing its
          // own body). Outside that range the offset is clamped to 0 or BODY.
          const t = cardEntryT(progress, ranges[i]);
          const eased = easeOutCubic(t);
          const slideUp = eased * CARD_BODY_PX; // 0 (future) → BODY (rest)

          const isPast = i < active;

          return (
            <div
              key={i}
              className="absolute left-0 right-0 rounded-xl bg-white shadow-[0_2px_10px_rgba(28,25,20,0.06)]"
              style={{
                // Resting "future" slot — every card lives one BODY below its
                // final position until it slides up. `transform` carries the
                // animation so it's GPU-cheap.
                top: i * CARD_STEP_PX + CARD_BODY_PX,
                height: CARD_TITLE_PX + CARD_BODY_PX,
                zIndex: 10 + i,
                transform: `translateY(${-slideUp}px)`,
                willChange: "transform",
              }}
            >
              <div className="flex items-center gap-3 px-4" style={{ height: CARD_TITLE_PX }}>
                {iconType === "clock" ? <ClockIcon /> : <SparkleIcon />}
                <h4 className="min-w-0 flex-1 truncate text-[15px] font-bold text-[#0e1414]">
                  {i + 1}. {step.title}
                </h4>
                {isPast ? <CheckFilled green={iconType === "sparkle"} /> : <CircleEmpty />}
              </div>
              <p className="px-4 pl-12 text-[13px] leading-[1.6] text-[#5a7894]">{step.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.25" stroke="#5a7894" strokeWidth="1.5" />
      <path d="M9 5v4l2.5 1.5" stroke="#5a7894" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z" fill="#7da57a" />
      <path d="M16 13l.7 1.8L18.5 15.5l-1.8.7L16 18l-.7-1.8L13.5 15.5l1.8-.7L16 13z" fill="#7da57a" />
    </svg>
  );
}

function CircleEmpty() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <circle cx="9" cy="9" r="8" stroke="#cbd5d2" strokeWidth="1.5" />
    </svg>
  );
}

function CheckFilled({ green = false }: { green?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <circle cx="9" cy="9" r="9" fill={green ? "#1d3624" : "#0e1414"} />
      <path d="M5 9L7.8 12L13 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

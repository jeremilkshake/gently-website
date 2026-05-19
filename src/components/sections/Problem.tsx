"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { useAudience } from "@/lib/audienceContext";
import { problemSection } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import type {
  ProblemFamiliarIntro,
  ProblemFamiliarPanelGroup,
  ProblemFamiliarTopic,
  ProblemSectionContent,
} from "@/types";

type Props = {
  /** When set (e.g. partner vertical pages), overrides audience-based copy. */
  copy?: ProblemSectionContent;
};

function ProblemPointCard({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-[var(--bg-2)] p-5 md:p-6 flex flex-col min-h-[148px]",
        className,
      )}
    >
      <p className="font-reading text-[14px] md:text-[15px] text-[var(--text)] leading-[1.55]">{text}</p>
    </div>
  );
}

function ProblemNarrativeCard({ subhead }: { subhead: string }) {
  return (
    <div className="rounded-[20px] bg-[var(--bg-2)] p-6 md:p-8 lg:p-9 flex flex-col h-full min-h-[320px] lg:min-h-full">
      <p className="font-reading text-[17px] md:text-[18px] text-[var(--text)] leading-[1.65] flex-1 font-light">
        {subhead}
      </p>
    </div>
  );
}

function ProblemPanelVisual({ group }: { group: ProblemFamiliarPanelGroup }) {
  return (
    <li className="list-none">
      <div className="flex flex-col items-center rounded-[18px] border border-[var(--border-subtle)] bg-[var(--card)] px-3 pb-4 pt-5 text-center shadow-card">
        <div className="mb-3 flex h-[88px] w-full items-center justify-center">
          <Image
            src={group.imageSrc}
            alt={group.imageAlt}
            width={80}
            height={80}
            unoptimized
            className="h-[72px] w-[72px] object-contain md:h-[80px] md:w-[80px]"
          />
        </div>
        <p className="font-reading mb-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--dim)]">
          {group.label}
        </p>
        <p className="font-reading m-0 text-[12px] leading-[1.45] text-[var(--muted)]">
          {group.points.join(" · ")}
        </p>
      </div>
    </li>
  );
}

function ProblemDetailPanel({
  topic,
  panelGroups,
  panelStatus,
}: {
  topic: ProblemFamiliarTopic;
  panelGroups: ProblemFamiliarPanelGroup[];
  panelStatus: string;
}) {
  return (
    <div
      key={topic.id}
      className="problem-panel-enter relative flex min-h-[360px] flex-col justify-between rounded-[24px] border border-[var(--border)] bg-[var(--bg-2)] p-6 md:min-h-[420px] md:p-8 lg:p-9"
    >
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <div className="mx-auto flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center rounded-[20px] border border-[var(--border-subtle)] bg-[var(--card)] shadow-card sm:mx-0 md:h-[128px] md:w-[128px]">
            <Image
              src={topic.imageSrc}
              alt={topic.imageAlt}
              width={112}
              height={112}
              unoptimized
              className="h-[96px] w-[96px] object-contain md:h-[104px] md:w-[104px]"
            />
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h3 className="font-serif text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.025em] text-[var(--text)] leading-[1.15]">
              {topic.title}
            </h3>
            <p className="font-reading mt-3 text-[15px] leading-[1.6] text-[var(--muted)]">
              {topic.body}
            </p>
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3">
          {panelGroups.map((group) => (
            <ProblemPanelVisual key={group.label} group={group} />
          ))}
        </ul>
      </div>
      <p className="mt-8 flex items-center justify-center gap-2 font-reading text-[13px] text-[var(--green)] sm:justify-start">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--green)]" aria-hidden />
        {panelStatus}
      </p>
    </div>
  );
}

/** Collapsed rows visible below the active topic */
const CAROUSEL_VISIBLE_ROWS = 2;
/** Peek of the next topic below the active row */
const NEXT_TOPIC_PEEK_PX = 44;
const CAROUSEL_TICK_MS = 500;

function ProblemFamiliarHeadline({
  familiar,
  copy,
  active,
}: {
  familiar: ProblemFamiliarIntro;
  copy: ProblemSectionContent;
  active: ProblemFamiliarTopic;
}) {
  const { narrative, topics } = familiar;
  const [displayedLabel, setDisplayedLabel] = useState(active.slotLabel);
  const [slotVisible, setSlotVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const longestSlotLabel = topics.reduce(
    (longest, topic) => (topic.slotLabel.length > longest.length ? topic.slotLabel : longest),
    "",
  );

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedLabel(active.slotLabel);
      setSlotVisible(true);
      return undefined;
    }

    if (active.slotLabel === displayedLabel) return undefined;

    setSlotVisible(false);
    const swapId = window.setTimeout(() => {
      setDisplayedLabel(active.slotLabel);
      setSlotVisible(true);
    }, 200);

    return () => window.clearTimeout(swapId);
  }, [active.slotLabel, displayedLabel, reduceMotion]);

  return (
    <>
      <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-3 font-bold">
        {copy.tag}
      </p>
      <p className="font-reading text-[15px] text-[var(--muted)] leading-[1.5] mb-5 max-w-[420px]">
        {familiar.eyebrow}
      </p>
      <h2 className="font-serif text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-0.025em] text-[var(--text)] leading-[1.12] mb-10 max-w-[480px]">
        <span>{narrative.prefix} </span>
        <span className="relative inline-block align-baseline">
          <span className="invisible whitespace-nowrap font-serif font-extrabold" aria-hidden>
            {longestSlotLabel}
          </span>
          <span
            aria-live="polite"
            className={cn(
              "absolute inset-x-0 bottom-0 whitespace-nowrap font-serif font-extrabold text-[var(--accent)] transition-opacity duration-300 ease-out",
              slotVisible ? "opacity-100" : "opacity-0",
            )}
          >
            {displayedLabel}
          </span>
        </span>
      </h2>
    </>
  );
}

function ProblemTopicAccordion({
  topics,
  intervalMs,
  onActiveChange,
  className,
}: {
  topics: ProblemFamiliarTopic[];
  intervalMs: number;
  onActiveChange: (topic: ProblemFamiliarTopic) => void;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shiftPx, setShiftPx] = useState(0);
  const [trackTransition, setTrackTransition] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [peekRevealed, setPeekRevealed] = useState(false);
  const [incomingRow, setIncomingRow] = useState(false);
  const elapsedMsRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const clickCooldownUntilRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  const visibleCount = Math.min(CAROUSEL_VISIBLE_ROWS, topics.length);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const activeTopic = topics[activeIndex] ?? topics[0];

  const queue = Array.from({ length: visibleCount }, (_, position) => {
    const index = (activeIndex + position) % topics.length;
    return { topic: topics[index], index, position };
  });

  useEffect(() => {
    const revealId = window.requestAnimationFrame(() => setPeekRevealed(true));
    return () => window.cancelAnimationFrame(revealId);
  }, []);

  const measureViewport = useCallback(() => {
    const first = firstRowRef.current;
    if (!first) return;
    setViewportHeight(first.offsetHeight + NEXT_TOPIC_PEEK_PX);
  }, []);

  useLayoutEffect(() => {
    measureViewport();
    const id = window.setTimeout(measureViewport, 320);
    return () => window.clearTimeout(id);
  }, [measureViewport, activeIndex, activeTopic?.id]);

  useEffect(() => {
    const first = firstRowRef.current;
    if (!first) return undefined;
    const ro = new ResizeObserver(() => measureViewport());
    ro.observe(first);
    return () => ro.disconnect();
  }, [measureViewport, activeTopic?.id]);

  const advanceToNext = useCallback(() => {
    elapsedMsRef.current = 0;
    setProgress(0);
    setActiveIndex((i) => (i + 1) % topics.length);
    isAnimatingRef.current = false;
    setIncomingRow(true);
    window.requestAnimationFrame(() => setIncomingRow(false));
  }, [topics.length]);

  const runAdvance = useCallback(() => {
    if (isAnimatingRef.current || topics.length < 2) return;

    if (reduceMotion) {
      advanceToNext();
      return;
    }

    const rowHeight = firstRowRef.current?.offsetHeight ?? 0;
    if (!rowHeight) {
      advanceToNext();
      return;
    }

    isAnimatingRef.current = true;
    setTrackTransition(true);
    window.requestAnimationFrame(() => setShiftPx(rowHeight));
  }, [advanceToNext, reduceMotion, topics.length]);

  const handleTrackTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "transform" || shiftPx === 0) return;
      setTrackTransition(false);
      setShiftPx(0);
      setActiveIndex((i) => (i + 1) % topics.length);
      isAnimatingRef.current = false;
      elapsedMsRef.current = 0;
      setProgress(0);
      setIncomingRow(true);
      window.requestAnimationFrame(() => setIncomingRow(false));
    },
    [shiftPx, topics.length],
  );

  const selectIndex = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimatingRef.current) return;

      elapsedMsRef.current = 0;
      setProgress(0);
      clickCooldownUntilRef.current = performance.now() + intervalMs * 2;

      const forward = (index - activeIndex + topics.length) % topics.length;
      if (forward === 1) {
        runAdvance();
        return;
      }

      setActiveIndex(index);
      setIncomingRow(true);
      window.requestAnimationFrame(() => setIncomingRow(false));
    },
    [activeIndex, intervalMs, runAdvance, topics.length],
  );

  useEffect(() => {
    if (activeTopic) onActiveChange(activeTopic);
  }, [activeTopic, onActiveChange]);

  useEffect(() => {
    if (isAnimatingRef.current) return;
    elapsedMsRef.current = 0;
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (reduceMotion || topics.length < 2) return undefined;

    let raf = 0;
    let lastFrame = performance.now();

    const tick = (now: number) => {
      const paused =
        hoverPausedRef.current ||
        now < clickCooldownUntilRef.current ||
        isAnimatingRef.current;

      if (paused) {
        lastFrame = now;
        raf = requestAnimationFrame(tick);
        return;
      }

      const delta = now - lastFrame;
      lastFrame = now;
      elapsedMsRef.current = Math.min(intervalMs, elapsedMsRef.current + delta);
      const nextProgress = elapsedMsRef.current / intervalMs;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        runAdvance();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, intervalMs, reduceMotion, runAdvance, topics.length]);

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={() => {
        hoverPausedRef.current = true;
      }}
      onPointerLeave={() => {
        hoverPausedRef.current = false;
      }}
      onFocusCapture={() => {
        hoverPausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          hoverPausedRef.current = false;
        }
      }}
    >
      <div
        ref={viewportRef}
        className="relative overflow-hidden border-t border-[var(--border)]"
        style={{
          height: viewportHeight ?? undefined,
          minHeight: viewportHeight ? undefined : "6rem",
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
      >
        <div
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            transform: shiftPx ? `translateY(-${shiftPx}px)` : undefined,
            transition: trackTransition
              ? `transform ${CAROUSEL_TICK_MS}ms ease-out`
              : "none",
          }}
        >
          {queue.map(({ topic, index, position }) => {
            const isActive = position === 0;
            const isNext = position === 1;
            const isIncoming = position === visibleCount - 1 && incomingRow;
            const isPeekBelow = position > 0 && !peekRevealed;
            return (
              <div
                key={`${topic.id}-${activeIndex}-${position}`}
                ref={position === 0 ? firstRowRef : undefined}
                className={cn(
                  "relative border-b border-[var(--border)] transition-all duration-500 ease-out",
                  isPeekBelow && "opacity-0 translate-y-2",
                  isIncoming && "opacity-0 translate-y-2",
                  !isActive &&
                    !isPeekBelow &&
                    !isIncoming &&
                    (isNext ? "opacity-50" : "opacity-40"),
                  isActive && "opacity-100",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 z-10 h-[2px] overflow-hidden bg-[var(--border)]",
                    !isActive && "pointer-events-none opacity-0",
                  )}
                  role={isActive ? "progressbar" : undefined}
                  aria-hidden={!isActive}
                  aria-valuemin={isActive ? 0 : undefined}
                  aria-valuemax={isActive ? 100 : undefined}
                  aria-valuenow={isActive ? Math.round(progress * 100) : undefined}
                  aria-label={isActive ? `Showing ${activeTopic?.title ?? "topic"}` : undefined}
                >
                  <div
                    className="h-full w-full origin-left bg-[var(--accent)]"
                    style={{
                      transform: `scaleX(${isActive && !reduceMotion ? progress : 0})`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => selectIndex(index)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 text-left border-0 bg-transparent cursor-pointer group transition-opacity duration-300",
                    isActive ? "py-4 opacity-100" : "py-3.5 hover:opacity-80",
                  )}
                  aria-expanded={isActive}
                  aria-controls={`problem-panel-${topic.id}`}
                  id={`problem-trigger-${topic.id}`}
                >
                  <span
                    className={cn(
                      "font-serif text-[15px] md:text-[16px] tracking-[-0.02em] transition-colors duration-300",
                      isActive ? "font-extrabold text-[var(--text)]" : "font-semibold text-[var(--dim)]",
                    )}
                  >
                    {topic.title}
                  </span>
                  <span
                    className={cn(
                      "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isActive
                        ? "border-[var(--accent)] bg-[rgba(45,55,231,0.06)] text-[var(--accent)] opacity-100"
                        : "border-[var(--border)] text-[var(--dim)] opacity-0 group-hover:opacity-60",
                    )}
                    aria-hidden
                  >
                    <span
                      className={cn(
                        "block h-1.5 w-1.5 rounded-full bg-current transition-transform duration-300",
                        isActive && "scale-125",
                      )}
                    />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FamiliarProblemLayout({
  familiar,
  copy,
  headlineRef,
}: {
  familiar: ProblemFamiliarIntro;
  copy: ProblemSectionContent;
  headlineRef: RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = useState<ProblemFamiliarTopic>(familiar.topics[0]);

  return (
    <section id="problem" className="py-20 md:py-28 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 items-start">
          <div className="lg:sticky lg:top-28">
            <div ref={headlineRef}>
              <ProblemFamiliarHeadline familiar={familiar} copy={copy} active={active} />
            </div>
            <ProblemTopicAccordion
              topics={familiar.topics}
              intervalMs={familiar.topicIntervalMs}
              onActiveChange={setActive}
            />
            <div className="mt-10 flex items-center gap-3">
              <Logo variant="footer" className="pointer-events-none flex-shrink-0" />
              <p className="font-reading text-[14px] text-[var(--muted)] leading-snug">
                <span className="font-serif font-extrabold text-[var(--text)]">gently.</span>{" "}
                {familiar.reassurance}
              </p>
            </div>
          </div>

          <div className="fade-up visible lg:min-h-[400px]">
            {active ? (
              <ProblemDetailPanel
                topic={active}
                panelGroups={familiar.panelGroups}
                panelStatus={familiar.panelStatus}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardProblemLayout({
  copy,
  headlineRef,
}: {
  copy: ProblemSectionContent;
  headlineRef: RefObject<HTMLDivElement | null>;
}) {
  const [first, second, third] = copy.items;

  return (
    <section
      id="problem"
      className="py-20 md:py-28 bg-[var(--bg)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-3">
          {copy.tag}
        </p>
        <div ref={headlineRef} className="fade-up mb-10 md:mb-12">
          <h2 className="font-serif text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-[-0.025em] text-center text-[var(--text)] max-w-[22ch] mx-auto leading-[1.08]">
            {copy.headline ?? ""}
          </h2>
        </div>

        <div className="fade-up visible grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-stretch">
          <ProblemNarrativeCard subhead={copy.subhead ?? ""} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {first ? <ProblemPointCard text={first.title} /> : null}
            {second ? <ProblemPointCard text={second.title} /> : null}
            {third ? <ProblemPointCard text={third.title} className="sm:col-span-2" /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Problem({ copy: copyOverride }: Props) {
  const { audience } = useAudience();
  const ref = useScrollReveal();
  const copy =
    copyOverride ?? (audience === "business" ? problemSection.business : problemSection.individual);
  const familiar = copy.familiar;

  if (familiar) {
    return <FamiliarProblemLayout familiar={familiar} copy={copy} headlineRef={ref} />;
  }

  return <StandardProblemLayout copy={copy} headlineRef={ref} />;
}

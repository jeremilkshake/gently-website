// src/components/sections/CompareScroll.tsx
"use client";

import { useMemo, useRef } from "react";
import {
  compareScrollMetrics,
  sectionAnimationProgress,
  sectionReleaseProgress,
  sectionReleaseTranslateT,
  type CompareScrollPlacement,
} from "@/lib/compare/progress";
import { useCompareScroll } from "@/lib/compare/useCompareScroll";
import { cn } from "@/lib/utils";
import CompareColumn, {
  type CompareColumnData,
} from "./compare/CompareColumn";
import CompareColumnsAnimated from "./compare/CompareColumnsAnimated";

interface CompareScrollProps {
  eyebrow?: string;
  line1: string;
  line2?: string;
  subheadingPrefix?: string;
  subheadingBrand?: string;
  columns: [CompareColumnData, CompareColumnData];
  /** Tighter scroll + overlap when placed directly above the CTA. */
  placement?: CompareScrollPlacement;
}

const INTRO_KICKER =
  "mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]";
const INTRO_HEADLINE =
  "mx-auto max-w-3xl text-center font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--text)]";
const INTRO_SUBHEAD =
  "mx-auto mt-4 max-w-xl text-center font-reading text-[15px] leading-[1.65] font-light text-[var(--muted)]";

function CompareScrollIntro({
  eyebrow,
  line1,
  line2,
  subheadingPrefix,
  subheadingBrand,
}: Pick<
  CompareScrollProps,
  "eyebrow" | "line1" | "line2" | "subheadingPrefix" | "subheadingBrand"
>) {
  const hasSubhead = subheadingPrefix || subheadingBrand;

  return (
    <>
      {eyebrow && <p className={INTRO_KICKER}>{eyebrow}</p>}
      <h2 className={INTRO_HEADLINE}>
        {line1}
        {line2 && (
          <>
            <br />
            {line2}
          </>
        )}
      </h2>
      {hasSubhead && (
        <p className={INTRO_SUBHEAD}>
          {subheadingPrefix}
          {subheadingBrand && (
            <em className="font-serif font-semibold not-italic text-[var(--accent)]">
              {subheadingBrand}
            </em>
          )}
        </p>
      )}
    </>
  );
}

/**
 * One pass: intro scrolls away → sticky stage → stack on scroll → roll up into next section.
 */
export default function CompareScroll({
  eyebrow,
  line1,
  line2,
  subheadingPrefix,
  subheadingBrand,
  columns,
  placement = "default",
}: CompareScrollProps) {
  const isPreCta = placement === "preCta";
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const longestCount = Math.max(
    columns[0].cards.length,
    columns[1].cards.length,
  );

  const { progress, isStatic, isLatched, latchSnap, pinTrackPx } =
    useCompareScroll(sectionRef, introRef, stageRef, longestCount, placement);

  const [negativeColumn, positiveColumn] = columns;

  const { animationShare } = useMemo(
    () => compareScrollMetrics(longestCount, placement),
    [longestCount, placement],
  );

  const animationProgress = sectionAnimationProgress(progress, animationShare);
  const releaseProgress = sectionReleaseProgress(progress, animationShare);
  const releaseTranslateT = sectionReleaseTranslateT(releaseProgress);

  const navH = "var(--header-nav-h)";

  const latchSettleY = (1 - latchSnap) * 10;
  const releaseY =
    releaseTranslateT > 0 ? -releaseTranslateT * 100 : 0;
  const hasCollapsed = animationProgress > 0;
  const isFinished = animationProgress >= 1 && releaseProgress >= 1;
  const stageTransform =
    !isStatic && (isLatched || hasCollapsed)
      ? `translate3d(0, calc(${isLatched ? latchSettleY : 0}px + ${releaseY}%), 0)`
      : undefined;
  const hideStage = !isStatic && !isLatched && isFinished;

  return (
    <section
      id="compare"
      ref={sectionRef}
      className={cn(
        "relative w-full scroll-mt-[120px] bg-[var(--bg)] pb-0",
        isPreCta && "-mb-[min(40vh,520px)]",
      )}
    >
      <div
        ref={introRef}
        className={cn(
          "relative mx-auto max-w-6xl px-6 text-center",
          isPreCta ? "pt-12 pb-6" : "pt-16 pb-10",
        )}
      >
        <CompareScrollIntro
          eyebrow={eyebrow}
          line1={line1}
          line2={line2}
          subheadingPrefix={subheadingPrefix}
          subheadingBrand={subheadingBrand}
        />
      </div>

      <div
        ref={stageRef}
        data-compare-stage
        data-latched={isLatched || undefined}
        style={
          isStatic
            ? undefined
            : {
                position: "sticky",
                top: navH,
                zIndex: 30,
                transform: stageTransform,
                willChange: stageTransform ? "transform" : undefined,
                visibility: hideStage ? "hidden" : undefined,
                pointerEvents: hideStage ? "none" : undefined,
              }
        }
        className="w-full bg-[var(--bg)]"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl flex-col justify-start px-6",
            isPreCta ? "py-5" : "py-8",
          )}
        >
          {isStatic && (
            <header className="mb-12 shrink-0">
              <CompareScrollIntro
                eyebrow={eyebrow}
                line1={line1}
                line2={line2}
                subheadingPrefix={subheadingPrefix}
                subheadingBrand={subheadingBrand}
              />
            </header>
          )}

          <div className="w-full">
            {isStatic ? (
              <div className="flex flex-col gap-8">
                {columns.map((column) => (
                  <CompareColumn
                    key={column.variant}
                    column={column}
                    sectionProgress={animationProgress}
                    longestCount={longestCount}
                    partnerCardCount={
                      column.variant === "negative"
                        ? positiveColumn.cards.length
                        : negativeColumn.cards.length
                    }
                    isStatic
                  />
                ))}
              </div>
            ) : (
              <CompareColumnsAnimated
                negative={negativeColumn}
                positive={positiveColumn}
                sectionProgress={animationProgress}
                longestCount={longestCount}
                isLatched={isLatched}
              />
            )}
          </div>
        </div>
      </div>

      {!isStatic && pinTrackPx > 0 && (
        <div aria-hidden style={{ height: pinTrackPx }} />
      )}
    </section>
  );
}

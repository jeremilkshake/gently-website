// src/components/sections/CompareScroll.tsx
"use client";

import { useMemo, useRef } from "react";
import { spreadStageHeightPx } from "@/lib/compare/config";
import {
  compareScrollMetrics,
  sectionAnimationProgress,
  sectionReleaseProgress,
  sectionReleaseTranslateT,
} from "@/lib/compare/progress";
import { useCompareScroll } from "@/lib/compare/useCompareScroll";
import CompareColumn, {
  type CompareColumnData,
} from "./compare/CompareColumn";
import CompareColumnsAnimated from "./compare/CompareColumnsAnimated";

interface CompareScrollProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  columns: [CompareColumnData, CompareColumnData];
}

/**
 * Three beats: spread cards scroll in → subtle latch under nav → stack on scroll.
 */
export default function CompareScroll({
  eyebrow,
  heading,
  subheading,
  columns,
}: CompareScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const longestCount = Math.max(
    columns[0].cards.length,
    columns[1].cards.length,
  );

  const {
    progress,
    isStatic,
    isLatched,
    latchSnap,
    pinTrackPx,
    spreadStagePx,
  } = useCompareScroll(sectionRef, introRef, stageRef, longestCount);

  const [negativeColumn, positiveColumn] = columns;

  const { scrollTrackVh, animationShare } = useMemo(
    () => compareScrollMetrics(longestCount),
    [longestCount],
  );

  const animationProgress = sectionAnimationProgress(progress, animationShare);
  const releaseProgress = sectionReleaseProgress(progress, animationShare);
  const releaseTranslateT = sectionReleaseTranslateT(releaseProgress);

  const navH = "var(--header-nav-h)";
  const pinViewport = `calc(100dvh - ${navH})`;

  const latchSettleY = (1 - latchSnap) * 10;
  const releaseY = releaseTranslateT > 0 ? -releaseTranslateT * 100 : 0;
  const stageTransform =
    isLatched && !isStatic
      ? `translate3d(0, calc(${latchSettleY}px + ${releaseY}%), 0)`
      : undefined;

  const spreadEstimate = spreadStageHeightPx(longestCount);
  const sectionMinHeight = isStatic
    ? undefined
    : `calc(${spreadEstimate}px + ${scrollTrackVh * 100}vh + 12rem)`;

  return (
    <section
      id="compare"
      ref={sectionRef}
      style={sectionMinHeight ? { minHeight: sectionMinHeight } : undefined}
      className="relative w-full scroll-mt-[120px] bg-[var(--bg)]"
    >
      <div ref={introRef} className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--blue)]">
            {eyebrow}
          </p>
        )}
        <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[var(--text)]">
          {heading}
        </h2>
        {subheading && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-muted)]">
            {subheading}
          </p>
        )}
      </div>

      {isLatched && !isStatic && spreadStagePx > 0 && (
        <div aria-hidden style={{ height: spreadStagePx }} />
      )}

      <div
        ref={stageRef}
        data-compare-stage
        data-latched={isLatched || undefined}
        style={
          isStatic
            ? undefined
            : isLatched
              ? {
                  position: "fixed",
                  top: navH,
                  left: 0,
                  right: 0,
                  height: pinViewport,
                  overflow: "hidden",
                  zIndex: 30,
                  transform: stageTransform,
                  willChange: "transform",
                }
              : {
                  position: "relative",
                }
        }
        className="w-full bg-[var(--bg)]"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-start px-6 py-8">
          {isStatic && (
            <header className="mb-12 shrink-0 text-center">
              {eyebrow && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--blue)]">
                  {eyebrow}
                </p>
              )}
              <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[var(--text)]">
                {heading}
              </h2>
              {subheading && (
                <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-muted)]">
                  {subheading}
                </p>
              )}
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

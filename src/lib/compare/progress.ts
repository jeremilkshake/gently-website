// src/lib/compare/progress.ts
//
// Pure functions only — no React, no DOM. This is the math that turns a single
// scroll position into a per-card collapse progress value.

import { COMPARE_CONFIG } from "./config";
import { easeInOutCubic } from "./easing";

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

/** Clamp to [0, 1]. */
export const clamp01 = (n: number): number =>
  n < 0 ? 0 : n > 1 ? 1 : n;

/** Ease-in-out cubic — used where gentle settle is needed. */
export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Ease-in quad — collapse ramps up quickly (less scroll to feel "done"). */
export const easeInQuad = (t: number): number => t * t;

/** Ease-out cubic — card slide settles gently into the stack. */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Smooth Hermite step — soft start and end within each card window. */
export const smoothstep = (t: number): number => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/**
 * Scroll window for one card within a column's 0..1 timeline.
 * Every card (including the last) slides into the deck in its own window.
 */
export function cardSlideProgress(
  columnProgress: number,
  cardIndex: number,
  totalCards: number,
): number {
  if (totalCards <= 0) return 0;
  if (totalCards === 1) return columnProgress >= 1 ? 1 : 0;

  const { windowOverlap } = COMPARE_CONFIG;
  const slot = 1 / totalCards;
  const windowLen = slot * (1 + windowOverlap);
  const start = cardIndex * slot;
  const end = start + windowLen;
  const raw = clamp01((columnProgress - start) / (end - start));
  return smoothstep(raw);
}

/** Index of the card currently entering the stack (for body visibility). */
export function activeCardIndex(
  columnProgress: number,
  totalCards: number,
): number {
  let idx = -1;
  for (let i = 0; i < totalCards; i++) {
    if (cardSlideProgress(columnProgress, i, totalCards) > 0) idx = i;
  }
  return idx;
}

/**
 * @deprecated Use cardSlideProgress — kept for any external imports.
 */
export function cardCollapseProgress(
  sectionProgress: number,
  cardIndex: number,
  totalCards: number,
): number {
  return 1 - cardSlideProgress(sectionProgress, cardIndex, totalCards);
}

/**
 * Total scroll height the section needs, in pixels.
 * = one viewport (so the sticky stage has somewhere to pin) +
 *   (collapsible cards × per-card window) + tail.
 * The LONGER column drives the height so both finish inside the section.
 */
export type CompareScrollPlacement = "default" | "preCta";

export function compareScrollMetrics(
  longestColumnCardCount: number,
  placement: CompareScrollPlacement = "default",
) {
  const cfg =
    placement === "preCta"
      ? { ...COMPARE_CONFIG, ...COMPARE_CONFIG.preCta }
      : COMPARE_CONFIG;
  const { cardScrollWindowVh, tailVh, releaseVh } = cfg;
  const cardTrackVh =
    longestColumnCardCount * cardScrollWindowVh + tailVh;
  const scrollTrackVh = cardTrackVh + releaseVh;
  const animationShare =
    scrollTrackVh > 0 ? cardTrackVh / scrollTrackVh : 1;
  return { cardTrackVh, scrollTrackVh, animationShare };
}

/** Map raw section scroll (0..1) to card/header animation (0..1), then hold at 1. */
export function sectionAnimationProgress(
  sectionProgress: number,
  animationShare: number,
): number {
  if (animationShare <= 0) return 1;
  return clamp01(sectionProgress / animationShare);
}

/** 0..1 through the post-animation release runway (scroll-off). */
export function sectionReleaseProgress(
  sectionProgress: number,
  animationShare: number,
): number {
  if (animationShare >= 1) return 0;
  return clamp01((sectionProgress - animationShare) / (1 - animationShare));
}

/** Eased 0..1 for translateY — gentle lift-off after the stack completes. */
export function sectionReleaseTranslateT(releaseProgress: number): number {
  return easeInOutCubic(releaseProgress);
}

export function sectionScrollHeight(
  longestColumnCardCount: number,
  viewportHeight: number,
): number {
  const { scrollTrackVh } = compareScrollMetrics(longestColumnCardCount);
  return viewportHeight + scrollTrackVh * viewportHeight;
}

/** Steps that scroll in lockstep between both columns (e.g. 6 vs 6). */
export function syncedStepCount(
  columnCardCount: number,
  partnerCardCount: number,
): number {
  return Math.min(columnCardCount, partnerCardCount);
}

/**
 * Split section scroll into a paired phase (steps 1..N in sync) and a
 * left-only tail (steps N+1..end on the longer column).
 */
export function compareScrollPhases(
  sectionProgress: number,
  longestColumnCardCount: number,
  syncedSteps: number,
): { syncProgress: number; leftOnlyProgress: number } {
  if (longestColumnCardCount <= 0 || syncedSteps <= 0) {
    return { syncProgress: clamp01(sectionProgress), leftOnlyProgress: 0 };
  }

  const syncShare = syncedSteps / longestColumnCardCount;
  const syncProgress =
    syncShare > 0 ? clamp01(sectionProgress / syncShare) : 1;
  const leftOnlyProgress =
    syncShare < 1
      ? clamp01((sectionProgress - syncShare) / (1 - syncShare))
      : 0;

  return { syncProgress, leftOnlyProgress };
}

/**
 * Per-card slide for one column. Indices 0..synced-1 use the same windows on
 * both sides; extra left cards use the tail phase while the partner stays put.
 */
export function columnCardSlideProgress(
  sectionProgress: number,
  cardIndex: number,
  columnCardCount: number,
  partnerCardCount: number,
  longestColumnCardCount: number,
  progressScale = 1,
): number {
  const scaled = clamp01(sectionProgress * progressScale);
  const synced = syncedStepCount(columnCardCount, partnerCardCount);
  const { syncProgress, leftOnlyProgress } = compareScrollPhases(
    scaled,
    longestColumnCardCount,
    synced,
  );

  if (cardIndex < synced) {
    return cardSlideProgress(syncProgress, cardIndex, synced);
  }

  if (columnCardCount <= synced) {
    return 1;
  }

  const extraTotal = columnCardCount - synced;
  const extraIndex = cardIndex - synced;
  return cardSlideProgress(leftOnlyProgress, extraIndex, extraTotal);
}

/**
 * Header fill / counter progress. Shorter column completes in the sync phase;
 * longer column tracks the full section.
 */
export function columnProgress(
  sectionProgress: number,
  columnCardCount: number,
  longestColumnCardCount: number,
  partnerCardCount?: number,
  progressScale = 1,
): number {
  const scaled = clamp01(sectionProgress * progressScale);
  const partner = partnerCardCount ?? longestColumnCardCount;
  const synced = syncedStepCount(columnCardCount, partner);
  const syncShare = synced / Math.max(1, longestColumnCardCount);

  if (columnCardCount > synced) {
    return scaled;
  }

  return syncShare > 0 ? clamp01(scaled / syncShare) : 1;
}

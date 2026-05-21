// src/lib/compare/config.ts
//
// Every number that controls the feel of the compare-scroll section lives here.
// Tune these first before touching component code.

export const COMPARE_CONFIG = {
  /** Height of a fully collapsed card row (px). Sticky stack step between cards. */
  collapsedHeight: 56,

  /** Uniform expanded card height (px) — every card uses this when open. */
  expandedCardHeight: 168,

  /** Vertical gap between cards when expanded (px). Lerps to 0 when collapsed. */
  startGap: 20,

  headerTop: 24,
  headerHeight: 88,

  /** Stage padding (px) — keep in sync with CompareScroll py-8. */
  stagePaddingY: 64,

  /** Viewport heights of scroll per card collapse — higher = slower, calmer handoffs. */
  cardScrollWindowVh: 0.38,

  /** Overlap between card windows — higher = more blend between steps. */
  windowOverlap: 0.5,

  /** Gently (right) column — >1 finishes header fill + card stack earlier in the scroll. */
  positiveProgressScale: 1.45,

  /** Hold after the last card lands (within the animation track). */
  tailVh: 0.28,

  /** Extra scroll after stack completes — pinned stage rolls up into the next section. */
  releaseVh: 0.32,

  /** >1 reaches full collapse earlier in each card's window. */
  collapseAccel: 1.35,

  /** Description fades out faster than height (multiplier on collapse t). */
  descriptionFadeRate: 2.4,

  /** Below this width, columns stack (header fill still animates on scroll). */
  staticBelowPx: 768,

  /** Latch settle duration (ms) — micro nudge when the stage pins. */
  latchSettleMs: 480,

  /** Tighter scroll when compare sits directly above the CTA. */
  preCta: {
    cardScrollWindowVh: 0.24,
    tailVh: 0.1,
    releaseVh: 0.26,
    stagePaddingY: 48,
  },
} as const;

export type CompareConfig = typeof COMPARE_CONFIG;

/** Expanded list: every card visible with gaps (start of section). */
export function spreadDeckHeightPx(cardCount: number): number {
  if (cardCount <= 0) return COMPARE_CONFIG.expandedCardHeight;
  const { expandedCardHeight, startGap } = COMPARE_CONFIG;
  return (
    cardCount * expandedCardHeight + Math.max(0, cardCount - 1) * startGap
  );
}

/** Visible stack: collapsed title rows + one expanded last card. */
export function stackViewportHeightPx(
  cardCount: number,
  expandedPx: number = COMPARE_CONFIG.expandedCardHeight,
): number {
  const rows = Math.max(1, cardCount);
  return (rows - 1) * COMPARE_CONFIG.collapsedHeight + expandedPx;
}

/** Interpolate deck height while cards collapse. */
export function deckHeightPx(cardCount: number, layoutT: number): number {
  const t = layoutT < 0 ? 0 : layoutT > 1 ? 1 : layoutT;
  const spread = spreadDeckHeightPx(cardCount);
  const stack = stackViewportHeightPx(cardCount);
  return spread + (stack - spread) * t;
}

/** Spread-phase stage height (headers + padding + decks). */
export function spreadStageHeightPx(longestColumnCardCount: number): number {
  return (
    COMPARE_CONFIG.stagePaddingY +
    COMPARE_CONFIG.headerHeight +
    12 +
    spreadDeckHeightPx(longestColumnCardCount)
  );
}

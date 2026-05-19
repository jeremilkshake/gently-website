// src/components/sections/compare/CompareColumnsAnimated.tsx
"use client";

import { columnProgress } from "@/lib/compare/progress";
import CompareColumnDeck from "./CompareColumnDeck";
import CompareColumnHeader from "./CompareColumnHeader";
import type { CompareColumnData } from "./CompareColumn";

interface CompareColumnsAnimatedProps {
  negative: CompareColumnData;
  positive: CompareColumnData;
  sectionProgress: number;
  longestCount: number;
  isLatched: boolean;
}

/**
 * Headers live in their own grid row (always top-aligned). Decks animate
 * underneath — cards never pull the header bars down the page.
 */
export default function CompareColumnsAnimated({
  negative,
  positive,
  sectionProgress,
  longestCount,
  isLatched,
}: CompareColumnsAnimatedProps) {
  const animProgress = isLatched ? sectionProgress : 0;
  const negativeFill = columnProgress(
    animProgress,
    negative.cards.length,
    longestCount,
    positive.cards.length,
  );
  const positiveFill = columnProgress(
    animProgress,
    positive.cards.length,
    longestCount,
    negative.cards.length,
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid shrink-0 grid-cols-2 gap-x-6">
        <CompareColumnHeader
          title={negative.title}
          fill={negativeFill}
          counterTo={negative.counterTo}
          counterUnit={negative.counterUnit}
          donePillLabel={negative.donePillLabel}
          variant={negative.variant}
          isStatic
        />
        <CompareColumnHeader
          title={positive.title}
          fill={positiveFill}
          counterTo={positive.counterTo}
          counterUnit={positive.counterUnit}
          counterPrefix={positive.counterPrefix}
          donePillLabel={positive.donePillLabel}
          variant={positive.variant}
          isStatic
        />
      </div>

      <div className="grid grid-cols-2 items-start gap-x-6">
        <CompareColumnDeck
          column={negative}
          sectionProgress={sectionProgress}
          longestCount={longestCount}
          partnerCardCount={positive.cards.length}
          isStatic={false}
          isLatched={isLatched}
        />
        <CompareColumnDeck
          column={positive}
          sectionProgress={sectionProgress}
          longestCount={longestCount}
          partnerCardCount={negative.cards.length}
          isStatic={false}
          isLatched={isLatched}
        />
      </div>
    </div>
  );
}

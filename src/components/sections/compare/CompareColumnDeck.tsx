// src/components/sections/compare/CompareColumnDeck.tsx
"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { COMPARE_CONFIG, deckHeightPx } from "@/lib/compare/config";
import { easeInOutCubic } from "@/lib/compare/easing";
import { columnCardSlideProgress } from "@/lib/compare/progress";
import CompareCard from "./CompareCard";
import type { CompareColumnData } from "./CompareColumn";

interface CompareColumnDeckProps {
  column: CompareColumnData;
  sectionProgress: number;
  longestCount: number;
  partnerCardCount: number;
  isStatic: boolean;
  /** When false, cards stay spread (approach phase). */
  isLatched: boolean;
  className?: string;
}

/** Card deck for one compare column (header rendered separately for alignment). */
export default function CompareColumnDeck({
  column,
  sectionProgress,
  longestCount,
  partnerCardCount,
  isStatic,
  isLatched,
  className,
}: CompareColumnDeckProps) {
  const total = column.cards.length;
  const animProgress = sectionProgress > 0 ? sectionProgress : 0;
  const progressScale =
    column.variant === "positive" ? COMPARE_CONFIG.positiveProgressScale : 1;

  const slideTs = useMemo(
    () =>
      column.cards.map((card) =>
        columnCardSlideProgress(
          animProgress,
          card.index,
          total,
          partnerCardCount,
          longestCount,
          progressScale,
        ),
      ),
    [column.cards, animProgress, total, partnerCardCount, longestCount, progressScale],
  );

  const layoutT = useMemo(() => {
    if (sectionProgress <= 0) return 0;
    const maxSlide = slideTs.length ? Math.max(...slideTs) : 0;
    return easeInOutCubic(maxSlide);
  }, [sectionProgress, slideTs]);

  const deckHeight = deckHeightPx(total, layoutT);

  if (isStatic) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-5">
          {column.cards
            .filter((card) => !card.isSpacer)
            .map((card) => (
              <CompareCard
                key={card.index}
                data={card}
                slideT={1}
                variant={column.variant}
                isStatic
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className="relative w-full"
        style={{
          height: deckHeight,
          overflow: sectionProgress > 0 ? "hidden" : "visible",
        }}
      >
        {column.cards.map((card, i) => (
          <CompareCard
            key={card.index}
            data={card}
            slideT={slideTs[i] ?? 0}
            variant={column.variant}
            isStatic={false}
          />
        ))}
      </div>
    </div>
  );
}

// src/components/sections/compare/CompareColumn.tsx
"use client";

import { COMPARE_CONFIG } from "@/lib/compare/config";
import { columnProgress } from "@/lib/compare/progress";
import CompareColumnDeck from "./CompareColumnDeck";
import CompareColumnHeader from "./CompareColumnHeader";
import type { CompareCardData } from "./CompareCard";

export interface CompareColumnData {
  title: string;
  variant: "negative" | "positive";
  counterTo: number;
  counterUnit: string;
  counterPrefix?: string;
  counterSuffix?: string;
  donePillLabel: string;
  cards: CompareCardData[];
}

interface CompareColumnProps {
  column: CompareColumnData;
  sectionProgress: number;
  longestCount: number;
  partnerCardCount: number;
  isStatic: boolean;
}

/** Stacked column for mobile / static layout (header + deck). */
export default function CompareColumn({
  column,
  sectionProgress,
  longestCount,
  partnerCardCount,
  isStatic,
}: CompareColumnProps) {
  const total = column.cards.length;
  const progressScale =
    column.variant === "positive" ? COMPARE_CONFIG.positiveProgressScale : 1;
  const colProgress = columnProgress(
    sectionProgress,
    total,
    longestCount,
    partnerCardCount,
    progressScale,
  );
  const fill = isStatic ? 1 : colProgress;

  return (
    <div className="min-w-0 flex-1">
      <CompareColumnHeader
        title={column.title}
        fill={fill}
        counterTo={column.counterTo}
        counterUnit={column.counterUnit}
        counterPrefix={column.counterPrefix}
        counterSuffix={column.counterSuffix}
        donePillLabel={column.donePillLabel}
        variant={column.variant}
        isStatic={isStatic}
      />
      <CompareColumnDeck
        column={column}
        sectionProgress={sectionProgress}
        longestCount={longestCount}
        partnerCardCount={partnerCardCount}
        isStatic={isStatic}
        isLatched={false}
      />
    </div>
  );
}

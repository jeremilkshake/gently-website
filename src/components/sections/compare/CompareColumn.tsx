// src/components/sections/compare/CompareColumn.tsx
"use client";

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
  const colProgress = columnProgress(
    sectionProgress,
    total,
    longestCount,
    partnerCardCount,
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
        donePillLabel={column.donePillLabel}
        variant={column.variant}
        isStatic
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

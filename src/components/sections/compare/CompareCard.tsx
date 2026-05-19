// src/components/sections/compare/CompareCard.tsx
"use client";

import { COMPARE_CONFIG } from "@/lib/compare/config";
import { lerp } from "@/lib/compare/progress";
import { cn } from "@/lib/utils";

export interface CompareCardData {
  index: number;
  title: string;
  description: string;
  /** Empty deck slot — keeps column height in sync with the partner column. */
  isSpacer?: boolean;
}

interface CompareCardProps {
  data: CompareCardData;
  /** 0..1 slide progress for this card within the deck. */
  slideT: number;
  variant: "negative" | "positive";
  isStatic: boolean;
}

/**
 * Cards begin in a spread list, then slide into a compact stack while pinned.
 */
export default function CompareCard({
  data,
  slideT,
  variant,
  isStatic,
}: CompareCardProps) {
  const { collapsedHeight, expandedCardHeight, startGap } = COMPARE_CONFIG;
  const bodySlide = expandedCardHeight - collapsedHeight;
  const spreadStep = expandedCardHeight + startGap;

  const spreadTop = data.index * spreadStep;
  const stackTop = data.index * collapsedHeight + bodySlide;
  const restingTop = lerp(spreadTop, stackTop, slideT);
  const slideUp = slideT * bodySlide;

  if (data.isSpacer) {
    if (isStatic) return null;

    return (
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 opacity-0"
        style={{
          top: restingTop,
          height: expandedCardHeight,
          zIndex: 10 + data.index,
          transform: `translate3d(0, ${-slideUp}px, 0)`,
        }}
      />
    );
  }

  const cardShell = cn(
    "flex h-full w-full flex-col overflow-hidden border bg-[var(--card-bg)] rounded-2xl",
  );

  if (isStatic) {
    return (
      <article
        className={cardShell}
        style={{
          borderColor: "var(--card-border)",
          height: expandedCardHeight,
          marginBottom: startGap,
        }}
      >
        <CardBody data={data} variant={variant} />
      </article>
    );
  }

  const settle = 0.99 + slideT * 0.01;

  return (
    <article
      className={cn(cardShell, "absolute left-0 right-0 shadow-[var(--shadow-card)]")}
      style={{
        top: restingTop,
        height: expandedCardHeight,
        zIndex: 10 + data.index,
        transform: `translate3d(0, ${-slideUp}px, 0) scale(${settle})`,
        transformOrigin: "center top",
        willChange: "transform",
        borderColor: "var(--card-border)",
      }}
    >
      <CardBody data={data} variant={variant} />
    </article>
  );
}

function CardBody({
  data,
  variant,
}: {
  data: CompareCardData;
  variant: "negative" | "positive";
}) {
  const badgeBg =
    variant === "positive" ? "var(--blue)" : "var(--badge-neutral)";
  const badgeText =
    variant === "positive" ? "var(--blue-contrast)" : "var(--text)";

  return (
    <div className="flex h-full min-h-0 flex-col px-5 py-4">
      <div className="flex shrink-0 items-start gap-2.5">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
          style={{ backgroundColor: badgeBg, color: badgeText }}
        >
          {data.index + 1}
        </span>
        <h4 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[var(--text)]">
          {data.title}
        </h4>
        <span
          className="mt-0.5 h-4 w-4 shrink-0 rounded-full border"
          style={{ borderColor: "var(--card-border)" }}
          aria-hidden
        />
      </div>
      <p className="font-reading mt-2 min-h-0 flex-1 overflow-y-auto text-[13px] leading-[1.5] text-[var(--text-muted)]">
        {data.description}
      </p>
    </div>
  );
}

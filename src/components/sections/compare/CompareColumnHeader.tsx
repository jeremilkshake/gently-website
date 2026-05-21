// src/components/sections/compare/CompareColumnHeader.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { COMPARE_CONFIG } from "@/lib/compare/config";
import { easeInOutCubic } from "@/lib/compare/easing";
import { horizontalRevealClip } from "@/lib/compareReveal";
import { cn } from "@/lib/utils";

interface CompareColumnHeaderProps {
  title: string;
  /** 0..1 completion of this column. Drives fill width + counter. */
  fill: number;
  counterTo: number;
  counterUnit: string;
  counterPrefix?: string;
  counterSuffix?: string;
  donePillLabel: string;
  variant: "negative" | "positive";
  isStatic: boolean;
}

const HEADER_THEME = {
  negative: {
    fill: "var(--compare-without-fill)",
    titleBase: "var(--text)",
    titleOnFill: "var(--text)",
    unitMuted: "var(--muted)",
    unitOnFill: "var(--muted)",
  },
  positive: {
    fill: "var(--compare-with-fill)",
    titleBase: "var(--text)",
    titleOnFill: "var(--text)",
    unitMuted: "var(--muted)",
    unitOnFill: "var(--text)",
  },
} as const;

/**
 * Pill header: fill wipe sits behind content; title/logo use clip-path inversion
 * so colour never paints over the glyphs.
 */
export default function CompareColumnHeader({
  title,
  fill,
  counterTo,
  counterUnit,
  counterPrefix,
  counterSuffix,
  donePillLabel,
  variant,
  isStatic,
}: CompareColumnHeaderProps) {
  const reveal = easeInOutCubic(fill);
  const theme = HEADER_THEME[variant];
  const counterValue = Math.round(counterTo * reveal);
  /** Full fill + single high-contrast foreground so title/logo stay readable. */
  const isComplete = isStatic || reveal >= 0.99;
  const isDone = reveal >= 0.999;
  const fillPct = Math.min(100, Math.max(0, reveal * 100));
  const pillBackground = isComplete
    ? theme.fill
    : `linear-gradient(to right, ${theme.fill} ${fillPct}%, var(--card) ${fillPct}%)`;
  const isWith = variant === "positive";

  return (
    <div
      style={{
        position: "static",
        height: COMPARE_CONFIG.headerHeight,
        zIndex: 50,
      }}
      className="mb-0"
    >
      <div
        className="relative h-full overflow-hidden rounded-full border shadow-[var(--shadow-float)]"
        style={{
          borderColor: "var(--card-border)",
          background: pillBackground,
        }}
      >
        {/* Foreground */}
        <div className="relative z-10 flex h-full items-center justify-between gap-3 px-5 sm:px-6">
          <div className="min-w-0 flex-1">
            {isWith ? (
              <CompareHeaderLogo title={title} />
            ) : (
              <span className="block truncate font-serif text-lg font-extrabold tracking-[-0.02em] text-[var(--text)] sm:text-xl">
                {title}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-bold",
                isWith
                  ? "bg-[var(--card)] text-[var(--text)]"
                  : "bg-[var(--hero-wordmark)] text-[var(--text)]",
                !isDone && "invisible",
              )}
              aria-hidden={!isDone}
            >
              {donePillLabel}
            </span>

            <div className="flex items-center gap-1.5">
              {counterPrefix && (
                <TwoToneInline
                  text={counterPrefix}
                  reveal={reveal}
                  complete={isComplete}
                  baseColor={theme.unitMuted}
                  onFillColor={theme.unitOnFill}
                  className="text-[13px] font-medium"
                />
              )}
              <span
                className="flex h-9 min-w-9 items-center justify-center gap-px rounded-full bg-[var(--card)] px-2 text-base font-bold text-[var(--text)]"
                style={{ border: "1px solid var(--card-border)" }}
              >
                <Odometer value={counterValue} />
                {counterSuffix && counterValue >= counterTo && (
                  <span aria-hidden>{counterSuffix}</span>
                )}
              </span>
              <TwoToneInline
                text={counterUnit}
                reveal={reveal}
                complete={isComplete}
                baseColor={theme.unitMuted}
                onFillColor={theme.unitOnFill}
                className="text-[13px] font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TwoToneInline({
  text,
  reveal,
  complete,
  baseColor,
  onFillColor,
  className,
}: {
  text: string;
  reveal: number;
  complete: boolean;
  baseColor: string;
  onFillColor: string;
  className?: string;
}) {
  if (complete) {
    return (
      <span className={cn("whitespace-nowrap", className)} style={{ color: onFillColor }}>
        {text}
      </span>
    );
  }

  const fillClip = horizontalRevealClip(reveal);
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span style={{ color: baseColor }}>{text}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ color: onFillColor, clipPath: fillClip }}
      >
        {text}
      </span>
    </span>
  );
}

/** Gently column — brand logo always full colour (no wipe inversion). */
function CompareHeaderLogo({ title }: { title: string }) {
  return (
    <div className="relative h-8 w-[118px] sm:h-9 sm:w-[132px]" aria-label={title}>
      <Image
        src="/images/grievegently-logo.svg"
        alt=""
        width={140}
        height={40}
        className="h-full w-auto max-w-none object-contain object-left"
        priority
      />
    </div>
  );
}

function Odometer({ value }: { value: number }) {
  const digitHeight = 24;
  const max = Math.max(0, value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span suppressHydrationWarning>{max}</span>;
  }

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: digitHeight }}
      aria-label={String(max)}
    >
      <span
        className="flex flex-col items-center"
        style={{
          transform: `translateY(-${max * digitHeight}px)`,
          transition: "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {Array.from({ length: max + 1 }, (_, i) => (
          <span
            key={i}
            className="flex items-center justify-center"
            style={{ height: digitHeight }}
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

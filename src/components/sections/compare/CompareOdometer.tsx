"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  className?: string;
};

/** Vertical roll when the counter digit changes */
export function CompareOdometer({ value, className }: Props) {
  const prev = useRef(value);

  useEffect(() => {
    prev.current = value;
  }, [value]);

  const digits = String(value).split("");

  return (
    <span
      className={cn("inline-flex items-center tabular-nums", className)}
      aria-live="polite"
      aria-atomic
    >
      {digits.map((digit, i) => (
        <span
          key={`${i}-${digit}`}
          className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden"
        >
          <span
            className="absolute inset-x-0 top-0 flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.55,1)]"
            style={{ transform: `translateY(-${Number(digit) * 100}%)` }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="flex h-[1.1em] items-center justify-center leading-none">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

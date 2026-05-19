"use client";

import type { CompareScrollLabels } from "@/types";
import { cn } from "@/lib/utils";

export type CompareMobileTab = "without" | "with";

type Props = {
  active: CompareMobileTab;
  onChange: (tab: CompareMobileTab) => void;
  labels: CompareScrollLabels;
};

export default function CompareMobileTabs({ active, onChange, labels }: Props) {
  const tabs: { id: CompareMobileTab; label: string }[] = [
    { id: "without", label: labels.mobileWithoutTab },
    { id: "with", label: labels.mobileWithTab },
  ];

  return (
    <div
      role="tablist"
      aria-label="Compare journeys"
      className="mx-auto mb-2 flex w-full max-w-content shrink-0 gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] p-1 lg:hidden"
    >
      {tabs.map(({ id, label }) => {
        const selected = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(id)}
            className={cn(
              "font-reading flex-1 rounded-full px-3 py-2 text-[12px] font-semibold leading-none transition-colors",
              selected
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-hover)]",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}


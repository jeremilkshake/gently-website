"use client";

import { trustBar } from "@/lib/content";

// Double the list once — marquee-track shifts -50% so both halves are shown seamlessly
const ITEMS = [...trustBar.logos, ...trustBar.logos];

export default function TrustBar() {
  return (
    <div className="w-full border-b border-[var(--border)] bg-[var(--bg-2)] py-5 overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex items-center gap-6">
        <p className="w-[140px] flex-shrink-0 text-left text-[11.5px] leading-[1.25] text-[var(--dim)] tracking-wide">
          {trustBar.label}
        </p>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[var(--bg-2)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[var(--bg-2)] to-transparent z-10" />
          <ul
            className="marquee-track flex items-center gap-14 w-max"
            style={{ animationDuration: "22s" }}
            aria-hidden="true"
          >
            {ITEMS.map((logo, i) => (
              <li
                key={`${logo}-${i}`}
                className="text-[var(--muted)] opacity-45 text-[38px] leading-none whitespace-nowrap select-none font-semibold"
              >
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

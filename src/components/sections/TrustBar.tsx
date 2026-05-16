"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, Users } from "lucide-react";
import { trustBar, trustBarBadges } from "@/lib/content";

// Double the list once — marquee-track shifts -50% so both halves are shown seamlessly
const ITEMS = [...trustBar.logos, ...trustBar.logos];

const BADGE_ICONS = {
  shield: ShieldCheck,
  mappin: MapPin,
  users: Users,
} as const;

export default function TrustBar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-2)] py-5"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 1.05 }
      }
    >
      <div className="max-w-content mx-auto px-6">
        <div className="flex items-center gap-6">
          <p className="font-reading w-[140px] flex-shrink-0 text-left text-[11.5px] leading-[1.25] text-[var(--dim)] tracking-wide">
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

        <div className="mt-4 pt-3.5 border-t border-[var(--border)] flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {trustBarBadges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon];
            return (
              <span
                key={badge.label}
                className="font-reading inline-flex items-center gap-1.5 text-[12px] text-[var(--muted)]"
              >
                <Icon size={13} strokeWidth={1.7} aria-hidden="true" />
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

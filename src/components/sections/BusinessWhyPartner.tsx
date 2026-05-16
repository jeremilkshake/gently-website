"use client";

import {
  BookOpen,
  FolderOpen,
  Heart,
  ListChecks,
  Lock,
  Network,
  Share2,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useAudience } from "@/lib/audienceContext";
import { businessWhyPartner } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ICONS: Record<string, LucideIcon> = {
  lock: Lock,
  network: Network,
  folder: FolderOpen,
  share: Share2,
  checklist: ListChecks,
  handoff: Users,
  heart: Heart,
  free: Sparkles,
  book: BookOpen,
};

export default function BusinessWhyPartner() {
  const { audience } = useAudience();
  const ref = useScrollReveal();
  if (audience !== "business") return null;

  const { kicker, headline, subhead, cards } = businessWhyPartner;

  return (
    <section
      id="b2b-why-partner"
      className="py-24 bg-[var(--bg)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-center mb-4 max-w-[720px] mx-auto"
        >
          {headline}
        </h2>
        <p className="fade-up visible font-reading text-[15px] text-[var(--muted)] text-center max-w-[680px] mx-auto mb-12 leading-[1.65] font-light">
          {subhead}
        </p>
      </div>

      {/* Carousel — full bleed so cards can peek past the content edge */}
      <div className="relative mt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />

        <ul
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {cards.map((card) => {
            const Icon = ICONS[card.icon] ?? Sparkles;
            return (
              <li
                key={card.title}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] bg-[var(--card)] border-2 border-[var(--border)] rounded-[20px] p-6 shadow-card flex flex-col"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  <Icon size={18} strokeWidth={2} className="text-white" />
                </div>
                <h3 className="font-serif text-[16px] font-extrabold text-[var(--text)] mb-2 leading-snug tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="font-reading text-[13px] text-[var(--muted)] leading-[1.65] flex-1">
                  {card.body}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="font-reading text-[11px] text-[var(--muted)] text-center mt-4 opacity-60">
          Scroll or swipe to explore →
        </p>
      </div>
    </section>
  );
}

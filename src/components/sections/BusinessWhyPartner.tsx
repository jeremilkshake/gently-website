"use client";

import {
  BookOpen,
  FolderOpen,
  ListChecks,
  Lock,
  Network,
  Share2,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { businessWhyPartner } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ICONS: Record<string, LucideIcon> = {
  lock: Lock,
  network: Network,
  folder: FolderOpen,
  share: Share2,
  checklist: ListChecks,
  handoff: Users,
  free: Sparkles,
  book: BookOpen,
};

export default function BusinessWhyPartner() {
  const ref = useScrollReveal();
  const { heading, kicker, tagline, subhead, cards } = businessWhyPartner;
  const primaryHeading = heading ?? businessWhyPartner.headline;

  return (
    <section
      id="b2b-why-partner"
      className="scroll-mt-[120px] bg-[var(--bg)] py-24"
    >
      <div className="mx-auto max-w-content px-6">
        <div className="text-center">
          <p className="mb-4 font-reading text-[11px] font-semibold uppercase tracking-[.18em] text-[var(--accent)]">
            {kicker}
          </p>
          <h2
            ref={ref}
            className="fade-up mx-auto mb-4 max-w-[760px] font-serif text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em]"
          >
            {primaryHeading}
          </h2>
          {tagline ? (
            <p className="mb-6 font-reading text-[14px] italic text-[var(--muted)]">
              {tagline}
            </p>
          ) : null}
          <p className="fade-up visible mx-auto mb-12 max-w-[680px] font-reading text-[15px] font-light leading-[1.65] text-[var(--muted)]">
            {subhead}
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Sparkles;
            const brandIconSize = Math.round(40 * (card.iconScale ?? 1));
            return (
              <li
                key={card.title}
                className="card-hover fade-up visible flex flex-col rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-5 shadow-card md:p-6"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {card.iconSrc ? (
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={brandIconSize}
                    height={brandIconSize}
                    unoptimized
                    className="mb-4 shrink-0 object-contain"
                    style={{ width: brandIconSize, height: brandIconSize }}
                    aria-hidden
                  />
                ) : (
                  <div
                    className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{ background: "var(--accent)" }}
                  >
                    <Icon size={18} strokeWidth={2} className="text-white" />
                  </div>
                )}
                <h3 className="mb-2 font-serif text-[16px] font-extrabold leading-snug tracking-[-0.02em] text-[var(--text)]">
                  {card.title}
                </h3>
                <p className="m-0 flex-1 font-reading text-[13px] leading-[1.65] text-[var(--muted)]">
                  {card.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useIsBusiness } from "@/lib/audienceContext";
import { solutionCareSection } from "@/lib/content";
import { cn } from "@/lib/utils";

type OpenId = string | null;

function hashToOpenId(hash: string): OpenId {
  if (hash === "pillar-estate") return "probate";
  if (hash === "pillar-admin") return "funeral";
  if (hash === "pillar-wellbeing") return "grief";
  return null;
}

export default function Solution() {
  const isBiz = useIsBusiness();
  const { kicker, headline, subhead, accordions } = isBiz
    ? solutionCareSection.business
    : solutionCareSection.individual;

  const [openId, setOpenId] = useState<OpenId>(null);

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.slice(1);
      setOpenId(hashToOpenId(raw));
      if (raw === "pillar-wellbeing" || raw.startsWith("pillar-")) {
        requestAnimationFrame(() => {
          const el = document.getElementById(raw);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="solution" className="py-20 md:py-28 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-0 items-start">
          {/* Left — headline stack */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-3 font-bold">{kicker}</p>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.03em] text-[var(--text)] leading-[1.12] mb-5">
              {headline}
            </h2>
            <p className="font-reading text-[15px] text-[var(--muted)] leading-[1.7] max-w-[420px]">{subhead}</p>
          </div>

          {/* Right — accordion grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 gap-y-0">
            {accordions.map((item) => {
              const isOpen = openId === item.id;
              const sectionId = item.pillarAnchor ? `pillar-${item.pillarAnchor}` : undefined;
              return (
                <div
                  key={item.id}
                  id={sectionId}
                  className="scroll-mt-[120px] border-t border-[var(--text)] pt-4 pb-8"
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-start justify-between gap-4 text-left border-0 bg-transparent p-0 cursor-pointer group"
                    aria-expanded={isOpen}
                    aria-controls={`solution-panel-${item.id}`}
                    id={`solution-trigger-${item.id}`}
                  >
                    <span className="text-[15px] font-bold text-[var(--text)] leading-snug tracking-[-0.02em] pr-2">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-transform duration-300",
                        isOpen && "rotate-45 border-[var(--accent)]"
                      )}
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </button>
                  <div
                    id={`solution-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`solution-trigger-${item.id}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 pt-4 pr-2">
                        <p className="font-reading text-[14px] leading-[1.65] text-[var(--muted)] m-0">{item.body}</p>
                        {item.bodySecondary ? (
                          <p className="font-reading text-[14px] leading-[1.65] text-[var(--muted)] m-0">
                            {item.bodySecondary}
                          </p>
                        ) : null}
                        {item.bullets && item.bullets.length > 0 ? (
                          <ul className="m-0 list-none space-y-2.5 p-0 pt-1">
                            {item.bullets.map((pt) => (
                              <li
                                key={pt}
                                className="font-reading flex gap-3 text-[14px] leading-[1.6] text-[var(--text)]"
                              >
                                <span
                                  className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--green)]"
                                  aria-hidden
                                />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

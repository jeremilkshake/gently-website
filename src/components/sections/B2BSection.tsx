"use client";

import Image from "next/image";
import Link from "next/link";
import { b2bSection, b2bSolutions } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function B2BSection() {
  const ref = useScrollReveal();

  return (
    <section id="b2b" className="scroll-mt-[120px] bg-[var(--bg)] py-20 md:py-24">
      <div className="max-w-content mx-auto w-full px-6">
        <div ref={ref} className="fade-up mx-auto mb-12 max-w-[640px] text-center">
          <p className="mb-2 text-[10px] uppercase tracking-[.14em] text-[var(--accent)]">{b2bSection.kicker}</p>
          <p className="font-reading mb-3 text-[clamp(17px,2.2vw,20px)] font-medium text-[var(--text)]">
            {b2bSection.intro}
          </p>
          <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
            {b2bSection.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {b2bSolutions.map((sol, i) => {
            const iconSize = Math.round(40 * (sol.iconScale ?? 1));
            return (
              <article
                key={sol.slug}
                id={sol.anchorId}
                className="card-hover scroll-mt-[120px] rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-7 shadow-card"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {sol.iconSrc ? (
                  <Image
                    src={sol.iconSrc}
                    alt=""
                    width={iconSize}
                    height={iconSize}
                    unoptimized
                    className="mb-3 shrink-0 object-contain"
                    style={{ width: iconSize, height: iconSize }}
                    aria-hidden
                  />
                ) : (
                  <div className="mb-3 text-[24px]" aria-hidden>
                    {sol.icon}
                  </div>
                )}
                <h3 className="mb-1.5 text-[16px] font-medium text-[var(--text)]">{sol.title}</h3>
                <p className="font-reading mb-3.5 text-[13px] leading-[1.65] text-[var(--muted)]">{sol.desc}</p>
                <Link
                  href={sol.href}
                  className="inline-flex items-center gap-1 text-[12px] text-[var(--accent)] no-underline transition-all hover:gap-2"
                >
                  Learn more →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 bg-[var(--bg-2)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          FAQ
        </p>
        <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-extrabold tracking-[-0.02em] text-center mb-11">
          Common questions.
        </h2>

        <div className="max-w-[640px] mx-auto">
          {faqItems.map((item, i) => (
            <div key={item.q} className="border-b border-[var(--border)]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left text-[14px] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "w-[18px] h-[18px] rounded-full border border-[var(--border)] flex-shrink-0 ml-4 flex items-center justify-center text-[13px] text-[var(--muted)] transition-all duration-300",
                    open === i ? "rotate-45 border-[var(--accent)]" : ""
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "font-reading overflow-hidden text-[13px] text-[var(--muted)] leading-[1.75] transition-all duration-300",
                  open === i ? "max-h-[300px] pb-5" : "max-h-0"
                )}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

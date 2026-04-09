"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useAudience } from "@/lib/audienceContext";
import { cn } from "@/lib/utils";

export default function ToggleBar() {
  const { audience, setAudience } = useAudience();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);
  });

  return (
    <div
      id="toggle-bar"
      className={cn(
        "relative z-[1] w-full shrink-0 border-b border-[var(--border)] backdrop-blur-md transition-colors duration-300",
        scrolled ? "bg-[var(--nav-sky-glass-bg)]" : "bg-[var(--hero-sky)]",
      )}
    >
      <div className="max-w-content mx-auto px-6 flex items-center">
        <button
          onClick={() => setAudience("individual")}
          className={cn(
            "px-5 py-3.5 text-[13px] border-b-2 transition-all",
            audience === "individual"
              ? "text-[var(--text)] border-[var(--accent)]"
              : "text-[var(--muted)] border-transparent hover:text-[var(--text)]"
          )}
        >
          For Individuals
        </button>
        <div className="w-px h-5 bg-[var(--border)] mx-1" />
        <button
          onClick={() => setAudience("business")}
          className={cn(
            "px-5 py-3.5 text-[13px] border-b-2 transition-all",
            audience === "business"
              ? "text-[var(--text)] border-[var(--accent)]"
              : "text-[var(--muted)] border-transparent hover:text-[var(--text)]"
          )}
        >
          For Business
        </button>
      </div>
    </div>
  );
}

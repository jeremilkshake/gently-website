"use client";

import { useAudience } from "@/lib/audienceContext";
import { cn } from "@/lib/utils";

export default function ToggleBar() {
  const { audience, setAudience } = useAudience();

  return (
    <div
      id="toggle-bar"
      className="sticky top-[60px] z-[100] bg-[var(--nav-glass-bg)] backdrop-blur-md border-b border-[var(--border)]"
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

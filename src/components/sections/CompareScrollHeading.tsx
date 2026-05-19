"use client";

import { horizontalRevealClip } from "@/lib/compareReveal";

type Props = {
  line1: string;
  line2: string;
  /** 0–1 scroll progress through the title runway */
  fill: number;
  instant?: boolean;
};

const HEADLINE =
  "font-serif text-[clamp(22px,2.8vw,38px)] font-extrabold leading-[1.25] tracking-[-0.02em]";

export default function CompareScrollHeading({ line1, line2, fill, instant }: Props) {
  const reveal = instant ? 1 : fill;
  const clipPath = horizontalRevealClip(reveal);

  const lines = (
    <>
      {line1}
      <br />
      {line2}
    </>
  );

  return (
    <div className="relative">
      <h2 className={`${HEADLINE} text-[var(--dim)]`}>{lines}</h2>
      <h2
        className={`${HEADLINE} pointer-events-none absolute inset-0 text-[var(--text)]`}
        aria-hidden
        style={{ clipPath, willChange: "clip-path" }}
      >
        {lines}
      </h2>
    </div>
  );
}

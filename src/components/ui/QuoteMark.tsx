import { cn } from "@/lib/utils";

type QuoteMarkProps = {
  className?: string;
  /** Icon = paired SVG marks; typographic = large Fraunces opening quote */
  variant?: "icon" | "typographic";
};

/** Decorative opening quotation mark. */
export default function QuoteMark({ className, variant = "icon" }: QuoteMarkProps) {
  if (variant === "typographic") {
    return (
      <span
        aria-hidden
        className={cn(
          "font-serif italic block leading-[0.85] tracking-[-0.04em] text-[var(--accent)]/22 select-none",
          "text-[clamp(3.25rem,7vw,4.25rem)]",
          className,
        )}
      >
        “
      </span>
    );
  }

  return (
    <svg
      width="48"
      height="34"
      viewBox="0 0 56 40"
      fill="none"
      aria-hidden
      className={cn("text-[var(--green)]", className)}
    >
      <path
        d="M14 0C6.3 0 0 6.8 0 15.2c0 7.2 3.8 13.4 9.4 16.8L6.4 40l11.8-4.2C20.2 37.3 22 37.6 24 37.6c7.7 0 14-6.8 14-15.2S31.7 0 24 0c-3.4 0-6.5 1-9.1 2.7C13.2 1 11.6 0 10 0H14zm24 0c-7.7 0-14 6.8-14 15.2 0 7.2 3.8 13.4 9.4 16.8L30.4 40 42.2 35.8C44.2 37.3 46 37.6 48 37.6c7.7 0 14-6.8 14-15.2S55.7 0 48 0c-3.4 0-6.5 1-9.1 2.7C37.2 1 35.6 0 34 0h4z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Overrides default height from `variant` (e.g. gate header) */
  imageClassName?: string;
  /** Nav bar vs footer sizing */
  variant?: "nav" | "footer";
};

/* Asset: public/images/grievegently-logo.svg — native 140×40 (Figma Frame 2147223648 / node 614-6280) */

const sizes = {
  nav: { width: 140, height: 40, className: "h-8 w-auto" },
  footer: { width: 140, height: 40, className: "h-[26px] w-auto" },
} as const;

export function Logo({ className, imageClassName, variant = "nav" }: LogoProps) {
  const s = sizes[variant];
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center no-underline", className)}
      aria-label="gently home"
    >
      <Image
        src="/images/grievegently-logo.svg"
        alt="gently"
        width={s.width}
        height={s.height}
        className={cn(s.className, imageClassName)}
        priority={variant === "nav"}
      />
    </Link>
  );
}

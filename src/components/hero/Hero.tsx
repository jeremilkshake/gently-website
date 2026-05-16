"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";
import { useIsBusiness } from "@/lib/audienceContext";
import {
  bookingUrl,
  heroBadgeText,
  heroBookingCta,
  heroBusinessBookingCta,
  heroBusinessLede,
  heroBusinessTrustBadges,
  heroVisual,
  openExternalTab,
} from "@/lib/content";

const HERO_TRUST_ICONS = {
  heart: Heart,
  shield: ShieldCheck,
} as const;

/** Max horizontal travel (px) at full progress — tuned for visible, responsive parallax */
const CLOUD_SCROLL_MAX_PX = 168;

/** Entrance easing — slower, smooth deceleration */
const HERO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Seconds between each hierarchy step (badge → title → lede → CTAs → image) */
const STAGGER = 0.22;
const DELAY_CHILD = 0.12;
const ITEM_DURATION = 0.82;

function buildHeroEnterVariants(reduceMotion: boolean | null): {
  container: Variants;
  item: Variants;
} {
  if (reduceMotion) {
    return {
      container: { hidden: {}, show: {} },
      item: {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    };
  }
  return {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: STAGGER,
          delayChildren: DELAY_CHILD,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: ITEM_DURATION, ease: HERO_EASE },
      },
    },
  };
}

/** Decorative Union.svg clouds — `shift` sign = direction when scrolling down through hero (+ = right) */
const heroClouds = [
  { key: "a", shift: 1, style: { top: "5%", left: "-6%", width: "min(340px, 46vw)" as const } },
  { key: "b", shift: -0.92, style: { top: "18%", right: "-2%", left: "auto" as const, width: "min(260px, 34vw)" as const } },
  { key: "c", shift: 0.72, style: { top: "38%", left: "8%", width: "min(200px, 28vw)" as const } },
  { key: "d", shift: -1.05, style: { bottom: "12%", top: "auto" as const, right: "12%", left: "auto" as const, width: "min(300px, 40vw)" as const } },
  { key: "e", shift: 0.88, style: { bottom: "22%", top: "auto" as const, left: "-3%", width: "min(220px, 30vw)" as const } },
] as const;

function HeroCloud({
  progress,
  shift,
  style,
}: {
  progress: MotionValue<number>;
  shift: number;
  style: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const x = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, CLOUD_SCROLL_MAX_PX * shift],
  );
  return (
    <motion.img
      src="/images/hero-cloud-union.svg"
      alt=""
      width={192}
      height={107}
      decoding="async"
      className="absolute select-none opacity-[0.92] will-change-transform"
      style={{ ...style, x }}
    />
  );
}

export default function Hero() {
  const isBiz = useIsBusiness();
  const reduceMotion = useReducedMotion();
  const { container: containerVariants, item: itemVariants } = buildHeroEnterVariants(reduceMotion ?? false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroProgressSmooth = useSpring(heroProgress, { stiffness: 140, damping: 38, mass: 0.35 });

  const { scrollYProgress } = useScroll();
  const glowY = useSpring(useTransform(scrollYProgress, [0, 0.28], [0, -36]), { stiffness: 60, damping: 20 });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 0.35], [0, 64]), { stiffness: 60, damping: 20 });
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -18]), { stiffness: 70, damping: 22 });

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-0 -mt-[var(--header-stack)] flex min-h-[100dvh] min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[var(--hero-sky)] px-6 pb-20 pt-[calc(var(--header-stack)+9rem+env(safe-area-inset-top,0px))] text-center"
    >
      {/* Full-bleed sky (SVG + solid fallback — same as nav / toggle at top) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[var(--hero-sky)] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-sky.svg)" }}
      />
      {/* Animated Union clouds — drift above sky, below glow + copy */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden
      >
        {heroClouds.map((c) => (
          <HeroCloud key={c.key} progress={heroProgressSmooth} shift={c.shift} style={c.style} />
        ))}
      </div>
      {/* Soft ambient glow — tuned down so the sky art stays primary */}
      <motion.div className="pointer-events-none absolute z-[2]" style={{ y: glowY, top: "45%", left: "50%" }}>
        <div
          className="hero-glow h-[400px] w-[700px] opacity-40"
          style={{
            background: "radial-gradient(ellipse, var(--glow-wellbeing) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div className="relative z-[3] w-full" style={{ y: textY }}>
        <motion.div
          key={isBiz ? "biz" : "ind"}
          className="flex w-full flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* 1 — Badge (context) */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--text)] bg-transparent px-3.5 py-1.5"
          >
            <Image
              src="/images/hero-badge-heart.svg"
              alt=""
              width={300}
              height={277}
              className="h-[22px] w-auto shrink-0 object-contain"
              aria-hidden
            />
            <span className="text-[12px] text-[var(--muted)]">{heroBadgeText}</span>
          </motion.div>

          {/* 2 — Headline → 3 — Lede → 4–5 — CTAs (one after another) */}
          {isBiz ? (
            <>
              <motion.h1
                variants={itemVariants}
                className="hero-headline font-serif mx-auto mb-4 max-w-[780px] text-[clamp(36px,5.5vw,66px)] font-extrabold leading-[1.08] tracking-[-0.025em]"
              >
                Give your people the{" "}
                <em className="italic text-[var(--hero-wordmark)]">gift</em>{" "}
                of{" "}
                <em className="italic text-[var(--hero-wordmark)]">complete support</em>{" "}
                after loss.
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="font-reading mx-auto mb-9 max-w-[520px] text-[clamp(15px,1.8vw,18px)] font-light text-[var(--muted)]"
              >
                {heroBusinessLede}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mb-0 flex w-full max-w-[520px] flex-wrap justify-center gap-2.5"
              >
                <a
                  href={bookingUrl}
                  {...openExternalTab}
                  className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-3 font-nunito text-sm font-extrabold text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)] sm:flex-initial"
                >
                  {heroBusinessBookingCta}
                </a>
                <a
                  href="#b2b"
                  className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[9px] border-2 border-[var(--text)] bg-transparent px-6 py-3 text-[14px] text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition-all hover:bg-[var(--surface-hover)] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)] sm:flex-initial"
                >
                  See solutions
                </a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              >
                {heroBusinessTrustBadges.map((badge) => {
                  const Icon = HERO_TRUST_ICONS[badge.icon];
                  return (
                    <span
                      key={badge.label}
                      className="font-reading inline-flex items-center gap-1.5 text-[12.5px] text-[var(--muted)]"
                    >
                      <Icon size={14} strokeWidth={1.6} aria-hidden="true" />
                      {badge.label}
                    </span>
                  );
                })}
              </motion.div>
            </>
          ) : (
            <>
              <motion.h1
                variants={itemVariants}
                className="hero-headline font-serif mx-auto mb-4 max-w-[780px] text-[clamp(36px,5.5vw,66px)] font-extrabold leading-[1.08] tracking-[-0.025em]"
              >
                Everything that comes after loss,
                <br />
                <em className="italic text-[var(--hero-wordmark)]">handled.</em>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="font-reading mx-auto mb-9 max-w-[460px] text-[clamp(15px,1.8vw,18px)] font-light text-[var(--muted)]"
              >
                Estate planning, automated admin, and science-based grief support, in one place.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mb-0 flex w-full max-w-[520px] flex-wrap justify-center gap-2.5"
              >
                <a
                  href={bookingUrl}
                  {...openExternalTab}
                  className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-3 font-nunito text-sm font-extrabold text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)] sm:flex-initial"
                >
                  {heroBookingCta}
                </a>
                <a
                  href="#solution"
                  className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[9px] border-2 border-[var(--text)] bg-transparent px-6 py-3 text-[14px] text-[var(--text)] shadow-[0_4px_0_0_var(--text)] transition-all hover:bg-[var(--surface-hover)] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)] sm:flex-initial"
                >
                  See how it works
                </a>
              </motion.div>
            </>
          )}

          {/* 6 — Supporting visual (last) */}
          <motion.div
            variants={itemVariants}
            className="hero-image mt-28 w-[80%] max-w-[784px] overflow-hidden"
            style={{ y: imageY }}
          >
            {/* TODO: swap with real screenshot */}
            <Image
              src={heroVisual.src}
              alt={heroVisual.alt}
              width={2048}
              height={1365}
              className="h-auto w-full"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .hero-glow {
          animation: breathe 7s ease-in-out infinite;
        }
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }
      `}</style>
    </section>
  );
}

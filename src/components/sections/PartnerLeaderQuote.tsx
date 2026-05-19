"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import QuoteMark from "@/components/ui/QuoteMark";
import { openExternalTab, partnerLeaderQuote } from "@/lib/content";
import { cn } from "@/lib/utils";

const WORD_MS = 65;
const MARK_LEAD_MS = 380;
const LINK_DELAY_MS = 400;
const WORD_ANIM_S = 0.12;
const EASE = [0.16, 1, 0.3, 1] as const;

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function TypewriterWord({
  word,
  delayIndex,
  revealedCount,
  reduceMotion,
  typing,
}: {
  word: string;
  delayIndex: number;
  revealedCount: number;
  reduceMotion: boolean | null;
  typing: boolean;
}) {
  const visible = reduceMotion || delayIndex < revealedCount;
  const showCursor = typing && !reduceMotion && delayIndex === revealedCount - 1;

  return (
    <motion.span
      className="inline whitespace-nowrap"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
      transition={{ duration: reduceMotion ? 0 : WORD_ANIM_S, ease: EASE }}
    >
      {word}
      {showCursor ? (
        <span
          className="typewriter-cursor ml-[1px] inline-block h-[0.85em] w-[2px] translate-y-[0.12em] bg-[var(--accent)] align-middle"
          aria-hidden
        />
      ) : (
        " "
      )}
    </motion.span>
  );
}

export default function PartnerLeaderQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const reduceMotion = useReducedMotion();
  const { paragraphs, organization, attribution, learnMoreLabel, learnMoreHref } = partnerLeaderQuote;
  const isExternal = learnMoreHref.startsWith("http");

  const { quoteLines, orgWords, attrWords, totalWords, ariaLabel } = useMemo(() => {
    let delayIndex = 0;
    const quoteLines = paragraphs.map((paragraph, paragraphIndex) => ({
      paragraphIndex,
      words: splitWords(paragraph).map((word) => ({
        word,
        delayIndex: delayIndex++,
      })),
    }));
    const orgWords = splitWords(organization).map((word) => ({
      word,
      delayIndex: delayIndex++,
    }));
    const attrWords = splitWords(attribution).map((word) => ({
      word,
      delayIndex: delayIndex++,
    }));
    return {
      quoteLines,
      orgWords,
      attrWords,
      totalWords: delayIndex,
      ariaLabel: [...paragraphs, organization, attribution].join(". "),
    };
  }, [paragraphs, organization, attribution]);

  const typing = started && revealedCount < totalWords;
  const typingDone = started && revealedCount >= totalWords;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (reduceMotion) {
      setStarted(true);
      return;
    }

    const reveal = () => setStarted(true);

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.9 && rect.bottom > 0;
    };

    if (inViewport()) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px 5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!started) return;
    if (reduceMotion) {
      setRevealedCount(totalWords);
      return;
    }
    if (revealedCount >= totalWords) return;

    const delay = revealedCount === 0 ? MARK_LEAD_MS : WORD_MS;
    const timer = window.setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [started, revealedCount, totalWords, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="partner-leader-quote"
      className="scroll-mt-[120px] bg-[var(--bg)] py-20 md:py-28"
    >
      <motion.div
        className="mx-auto max-w-content px-6 md:flex md:justify-end"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
      >
        <blockquote
          className="w-full min-w-0 max-w-[580px] border-l-2 border-[var(--border)] pl-6 md:pl-8"
          aria-label={ariaLabel}
        >
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
          >
            <QuoteMark variant="typographic" className="mb-2 md:mb-3" />
          </motion.div>

          <motion.div
            className="space-y-5 md:space-y-6"
            initial={false}
          >
            {quoteLines.map(({ paragraphIndex, words }) => {
              const isEmphasis = paragraphIndex === paragraphs.length - 1;
              return (
                <p
                  key={paragraphIndex}
                  className={cn(
                    "m-0 leading-[1.65]",
                    isEmphasis
                      ? "font-serif text-[clamp(19px,2.2vw,24px)] font-extrabold tracking-[-0.02em] text-[var(--text)]"
                      : "font-reading text-[clamp(16px,1.8vw,18px)] font-light text-[var(--muted)]",
                  )}
                  aria-hidden
                >
                  {words.map(({ word, delayIndex }, wi) => (
                    <TypewriterWord
                      key={`${paragraphIndex}-${wi}`}
                      word={word}
                      delayIndex={delayIndex}
                      revealedCount={revealedCount}
                      reduceMotion={reduceMotion}
                      typing={typing}
                    />
                  ))}
                </p>
              );
            })}
          </motion.div>

          <footer className="mt-10 border-t border-[var(--border)] pt-8">
            <p
              className="font-serif text-[clamp(26px,3vw,32px)] font-extrabold tracking-[-0.02em] text-[var(--text)]"
              aria-hidden
            >
              {orgWords.map(({ word, delayIndex }, wi) => (
                <TypewriterWord
                  key={`org-${wi}`}
                  word={word}
                  delayIndex={delayIndex}
                  revealedCount={revealedCount}
                  reduceMotion={reduceMotion}
                  typing={typing}
                />
              ))}
            </p>
            <p
              className="mt-2 font-reading text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--dim)]"
              aria-hidden
            >
              {attrWords.map(({ word, delayIndex }, wi) => (
                <TypewriterWord
                  key={`attr-${wi}`}
                  word={word}
                  delayIndex={delayIndex}
                  revealedCount={revealedCount}
                  reduceMotion={reduceMotion}
                  typing={typing}
                />
              ))}
            </p>
            <motion.div
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 4 }}
              animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: EASE,
                delay: reduceMotion ? 0 : LINK_DELAY_MS / 1000,
              }}
            >
              {isExternal ? (
                <a
                  href={learnMoreHref}
                  {...openExternalTab}
                  className="mt-5 inline-flex items-center gap-1.5 font-reading text-[13px] font-medium text-[var(--accent)] no-underline transition-all hover:gap-2.5"
                >
                  {learnMoreLabel}
                  <ArrowRight size={14} aria-hidden />
                </a>
              ) : (
                <Link
                  href={learnMoreHref}
                  className="mt-5 inline-flex items-center gap-1.5 font-reading text-[13px] font-medium text-[var(--accent)] no-underline transition-all hover:gap-2.5"
                >
                  {learnMoreLabel}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              )}
            </motion.div>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { GatePageContent } from "@/types";
import { gateScreenAssets, marketingAccessGate, openExternalTab } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** 2px outline + 4px drop on Y using semantic dark border */
const gateBtnBorderShadow =
  "border-2 border-[var(--text)] shadow-[0_4px_0_0_var(--text)]";

const gateBtnType = "font-nunito font-extrabold";

type Props = {
  content: GatePageContent;
  /** From server `searchParams` so SSR / hydration match (avoid useSearchParams drift) */
  urlFrom?: string | null;
  urlGate?: string | null;
};

export function GateClient({ content, urlFrom = null, urlGate = null }: Props) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const showMisconfigured = urlGate === "misconfigured";

  const fadeEase = [0.22, 0.94, 0.32, 1] as const;
  const fadeUp = reduceMotion ? 0 : 14;

  /** End-to-end intro ≈ 3s: header (parallel) → word cascade → Early Access → Info */
  const timeline = useMemo(() => {
    const TOTAL = 3;
    if (reduceMotion) {
      return {
        headerDur: 0,
        wordDur: 0,
        wordDelays: [] as number[],
        btnDur: 0,
        btn1Delay: 0,
        btn2Delay: 0,
      };
    }
    const flat = content.headlineLines.flat();
    const n = flat.length;
    const T_HEADER = 0.45;
    const wordDur = 0.16;
    const btnDur = 0.34;
    const btnStagger = 0.12;
    const gapBeforeBtns = 0.06;
    const btn2Start = TOTAL - btnDur;
    const btn1Start = btn2Start - btnStagger;
    const wordsEnd = btn1Start - gapBeforeBtns;
    const wordsStart = T_HEADER;
    const wordsWindow = Math.max(0, wordsEnd - wordsStart - wordDur);
    const wordStagger = n <= 1 ? 0 : wordsWindow / (n - 1);
    const wordDelays = flat.map((_, i) => wordsStart + i * wordStagger);

    return {
      headerDur: T_HEADER,
      wordDur,
      wordDelays,
      btnDur,
      btn1Delay: btn1Start,
      btn2Delay: btn2Start,
    };
  }, [content.headlineLines, reduceMotion]);

  const headlineWords = useMemo(() => {
    let i = 0;
    return content.headlineLines.map((line) =>
      line.map((word) => ({ word, delayIndex: i++ }))
    );
  }, [content.headlineLines]);

  const headlineAriaLabel = useMemo(
    () => content.headlineLines.map((line) => line.join(" ")).join(" "),
    [content.headlineLines]
  );

  const [passwordOpen, setPasswordOpen] = useState(urlGate === "reauth");
  const [infoOpen, setInfoOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destination =
    urlFrom && urlFrom.startsWith("/") && !urlFrom.startsWith("//") ? urlFrom : "/";

  const submit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(destination);
        router.refresh();
        return;
      }
      if (res.status === 401) {
        setError(content.wrongPassword);
        return;
      }
      if (res.status === 503) {
        setError(marketingAccessGate.misconfigured);
        return;
      }
      setError(content.networkError);
    } catch {
      setError(content.networkError);
    } finally {
      setLoading(false);
    }
  }, [password, router, destination, content.wrongPassword, content.networkError]);

  return (
    <div className="fixed inset-0 z-[200] flex min-h-0 flex-col overflow-x-hidden overflow-y-auto bg-[#FFD12B]">
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#FFD12B] bg-contain bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url("${gateScreenAssets.introSvg}?v=${gateScreenAssets.introVersion}")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh min-w-0 flex-1 flex-col font-nunito font-semibold">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pt-3 sm:px-6 sm:pt-4 md:px-10 md:pt-5">
          <motion.div
            className="shrink-0"
            initial={{ opacity: reduceMotion ? 1 : 0, y: fadeUp }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: timeline.headerDur,
              ease: fadeEase,
              delay: 0,
            }}
          >
            <Logo variant="nav" imageClassName="h-5 w-auto sm:h-6" />
          </motion.div>
          <motion.div
            className="flex min-w-0 flex-1 basis-[10rem] justify-end sm:basis-auto"
            initial={{ opacity: reduceMotion ? 1 : 0, y: fadeUp }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: timeline.headerDur,
              ease: fadeEase,
              delay: 0,
            }}
          >
            <Image
              src={gateScreenAssets.taglineSvg}
              alt={content.tagline}
              width={381}
              height={26}
              className="h-[clamp(0.7rem,1.85vw+0.25rem,1.05rem)] w-auto max-w-[min(88vw,20rem)] shrink object-contain object-right"
              priority
            />
          </motion.div>
        </header>

        <main
          className="flex min-h-0 flex-1 flex-col items-center justify-start pt-8 pb-[clamp(14rem,48vmin,26rem)] sm:justify-center sm:pt-0 px-5 sm:px-8 md:px-12"
          aria-label="Early access"
        >
          <p
            className="m-0 text-center font-nunito font-extrabold leading-[1.31] tracking-[0%] text-[#0C0B09] sm:mt-0"
            style={{ fontSize: "clamp(2rem, 5vw, 3.85rem)" }}
            aria-label={headlineAriaLabel}
          >
            {headlineWords.map((line, li) => (
              <span key={li} className="block">
                {line.map(({ word, delayIndex }) => (
                  <motion.span
                    key={delayIndex}
                    className="inline-block me-[0.28em] last:me-0"
                    initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: timeline.wordDur,
                      ease: fadeEase,
                      delay: reduceMotion ? 0 : timeline.wordDelays[delayIndex] ?? 0,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </p>

          <div className="mt-8 flex w-full max-w-sm flex-wrap items-stretch justify-center gap-3 text-[#0C0B09] sm:mt-10">
            <motion.button
              type="button"
              onClick={() => {
                setPasswordOpen(true);
                setError(null);
              }}
              className={cn(
                gateBtnType,
                "min-h-[3rem] min-w-[9.5rem] flex-1 rounded-xl px-5 py-3 text-sm sm:min-w-[10.5rem]",
                gateBtnBorderShadow,
                "bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
              )}
              initial={{ opacity: reduceMotion ? 1 : 0, y: fadeUp }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: timeline.btnDur,
                ease: fadeEase,
                delay: reduceMotion ? 0 : timeline.btn1Delay,
              }}
            >
              {content.accessCta}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setInfoOpen(true)}
              className={cn(
                gateBtnType,
                "min-h-[3rem] min-w-[9.5rem] flex-1 rounded-xl bg-[#0C0B09]/[0.06] px-5 py-3 text-sm text-[#0C0B09] sm:min-w-[10.5rem]",
                gateBtnBorderShadow,
                "transition hover:bg-[#0C0B09]/10 active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
              )}
              initial={{ opacity: reduceMotion ? 1 : 0, y: fadeUp }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: timeline.btnDur,
                ease: fadeEase,
                delay: reduceMotion ? 0 : timeline.btn2Delay,
              }}
            >
              {content.infoCta}
            </motion.button>
          </div>
        </main>
      </div>

      {showMisconfigured && (
        <p
          className="pointer-events-none absolute bottom-4 left-0 right-0 z-[205] px-4 text-center font-nunito text-xs font-semibold text-[#0C0B09]/80"
          role="status"
        >
          {marketingAccessGate.misconfigured}
        </p>
      )}

      {infoOpen && (
        <div
          className="fixed inset-0 z-[208] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-info-title"
        >
          <div className="flex max-h-[min(85dvh,640px)] w-full max-w-md flex-col rounded-2xl border border-[rgba(12,11,9,0.12)] bg-[#FFFBF5] font-nunito font-semibold shadow-xl">
            <div className="border-b border-[rgba(12,11,9,0.08)] px-5 py-4">
              <h2 id="gate-info-title" className="m-0 text-lg text-[#0C0B09]">
                {content.infoModalTitle}
              </h2>
            </div>
            <div className="font-reading min-h-0 flex-1 overflow-y-auto px-5 py-4 text-left">
              <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#0C0B09]/65">
                {content.earlyAccessKicker}
              </p>
              <p className="mt-3 m-0 text-base leading-snug text-[#0C0B09]">{content.earlyAccessHeadline}</p>
              <p className="mt-4 m-0 text-[14px] leading-snug text-[#0C0B09]/88">{content.earlyAccessBody}</p>
              <p className="mt-4 m-0 text-[13px] leading-snug text-[var(--dim)]">{content.accessPhasePasswordHint}</p>
              <p className="mt-4 m-0 text-[12px] leading-snug text-[var(--dim)]">{content.accessButtonSubtext}</p>
              <div className="mt-6 border-t border-[rgba(12,11,9,0.08)] pt-5">
                <p className="m-0 text-[13px] leading-snug text-[#0C0B09]/88">{content.waitlistIntro}</p>
                <a
                  href={content.waitlistUrl}
                  {...openExternalTab}
                  className={cn(
                    gateBtnType,
                    "mt-4 flex min-h-[3rem] w-full cursor-pointer items-center justify-center rounded-xl px-5 py-3 text-center text-sm no-underline",
                    gateBtnBorderShadow,
                    "bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97]",
                    "active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
                  )}
                >
                  {content.waitlistCta}
                </a>
              </div>
            </div>
            <div className="border-t border-[rgba(12,11,9,0.08)] px-5 py-4">
              <button
                type="button"
                onClick={() => setInfoOpen(false)}
                className={cn(
                  gateBtnType,
                  "w-full rounded-xl bg-[#0C0B09]/[0.07] px-5 py-2.5 text-sm text-[#0C0B09] transition hover:bg-[#0C0B09]/10",
                  gateBtnBorderShadow,
                  "active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
                )}
              >
                {content.infoCloseCta}
              </button>
            </div>
          </div>
        </div>
      )}

      {passwordOpen && (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-password-title"
        >
          <div className="w-full max-w-sm rounded-2xl border border-[rgba(12,11,9,0.12)] bg-[#FFFBF5] p-6 font-nunito font-semibold shadow-xl">
            <h2 id="gate-password-title" className="m-0 text-lg text-[#0C0B09]">
              {content.passwordTitle}
            </h2>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
              }}
              className="mt-4 w-full rounded-xl border border-[rgba(12,11,9,0.15)] bg-white px-4 py-3 font-nunito text-sm font-semibold text-[#0C0B09] outline-none ring-[var(--gate-intro-blue)]/35 focus:ring-2"
              placeholder={content.passwordPlaceholder}
            />
            {error && (
              <p className="mt-3 text-sm text-[#C62828]">{error}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => void submit()}
                className={cn(
                  gateBtnType,
                  "rounded-xl px-5 py-2.5 text-sm",
                  gateBtnBorderShadow,
                  "bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97] disabled:opacity-50",
                  "active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
                )}
              >
                {loading ? "…" : content.submitCta}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setPasswordOpen(false);
                  setPassword("");
                  setError(null);
                }}
                className={cn(
                  gateBtnType,
                  "rounded-xl bg-[#FFFBF5] px-5 py-2.5 text-sm text-[#0C0B09]/80 hover:bg-black/[0.04]",
                  gateBtnBorderShadow,
                  "active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
                )}
              >
                {content.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

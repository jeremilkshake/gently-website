"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
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
  const showMisconfigured = urlGate === "misconfigured";

  const [passwordOpen, setPasswordOpen] = useState(false);
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
          <Logo variant="nav" imageClassName="h-5 w-auto sm:h-6" />
          <div className="flex min-w-0 flex-1 basis-[10rem] justify-end sm:basis-auto">
            <Image
              src={gateScreenAssets.taglineSvg}
              alt={content.tagline}
              width={381}
              height={26}
              className="h-[clamp(0.7rem,1.85vw+0.25rem,1.05rem)] w-auto max-w-[min(88vw,20rem)] shrink object-contain object-right"
              priority
            />
          </div>
        </header>

        <main
          className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-[clamp(14rem,48vmin,26rem)] sm:px-8 md:px-12"
          aria-label="Early access"
        >
          <div className="flex w-full max-w-sm flex-wrap items-stretch justify-center gap-3 text-[#0C0B09]">
            <button
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
            >
              {content.accessCta}
            </button>
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              className={cn(
                gateBtnType,
                "min-h-[3rem] min-w-[9.5rem] flex-1 rounded-xl bg-[#0C0B09]/[0.06] px-5 py-3 text-sm text-[#0C0B09] sm:min-w-[10.5rem]",
                gateBtnBorderShadow,
                "transition hover:bg-[#0C0B09]/10 active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]",
              )}
            >
              {content.infoCta}
            </button>
          </div>

          <p className="mt-6 text-center font-nunito font-extrabold leading-[1.31] tracking-[0%] text-[#0C0B09]" style={{ fontSize: "clamp(2rem, 5vw, 3.85rem)" }}>
            Grief shouldn&apos;t feel like admin.{" "}
            <br />
            Let us handle the paperwork,{" "}
            <br />
            You handle the human stuff.
          </p>
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
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-left">
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

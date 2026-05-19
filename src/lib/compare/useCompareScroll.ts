// src/lib/compare/useCompareScroll.ts
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { subscribeSmoothScrollTick } from "@/lib/smoothScroll";
import { COMPARE_CONFIG, spreadStageHeightPx } from "./config";
import { compareScrollMetrics, easeOutCubic } from "./progress";

function readNavHeightPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-nav-h",
  );
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 60;
}

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function useCompareStaticMode(): boolean {
  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const isNarrow = useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(
        `(max-width: ${COMPARE_CONFIG.staticBelowPx - 1}px)`,
      );
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () =>
      window.matchMedia(`(max-width: ${COMPARE_CONFIG.staticBelowPx - 1}px)`)
        .matches,
    () => false,
  );

  return prefersReducedMotion || isNarrow;
}

export interface CompareScrollState {
  /** 0..1 collapse animation while pinned (0 = spread, 1 = stacked). */
  progress: number;
  ready: boolean;
  isStatic: boolean;
  isLatched: boolean;
  /** 0..1 soft settle when the stage first pins. */
  latchSnap: number;
  /** Pin-track height in px (scroll room for collapse + release). */
  pinTrackPx: number;
  /** Spacer height when fixed — spread stage height. */
  spreadStagePx: number;
}

/**
 * Scroll phases:
 * 1. Approach — spread cards scroll in document flow (progress = 0).
 * 2. Latch — stage pins under the nav with a subtle settle.
 * 3. Pinned — scroll drives card stack animation, then release.
 */
export function useCompareScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  introRef: React.RefObject<HTMLElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
  longestColumnCardCount: number,
): CompareScrollState {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [isLatched, setIsLatched] = useState(false);
  const [latchSnap, setLatchSnap] = useState(1);
  const [pinTrackPx, setPinTrackPx] = useState(0);
  const [spreadStagePx, setSpreadStagePx] = useState(0);

  const isStatic = useCompareStaticMode();
  const latchedRef = useRef(false);
  const latchSnapRef = useRef(1);
  const latchStartMsRef = useRef(0);
  const latchScrollRef = useRef<number | null>(null);
  const spreadStageRef = useRef(0);

  useEffect(() => {
    if (isStatic) {
      setReady(true);
      return;
    }

    const { scrollTrackVh } = compareScrollMetrics(longestColumnCardCount);
    spreadStageRef.current = spreadStageHeightPx(longestColumnCardCount);

    const measure = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const vh = window.innerHeight;
      const navH = readNavHeightPx();
      const pinViewport = Math.max(320, vh - navH);
      const pinTrack = scrollTrackVh * vh;

      if (!latchedRef.current && stage.offsetHeight > 0) {
        spreadStageRef.current = stage.offsetHeight;
      }

      const sectionTop = section.getBoundingClientRect().top;
      const stageTop = stage.getBoundingClientRect().top;
      const scrolledInto = Math.max(0, -sectionTop);

      const shouldLatch = stageTop <= navH + 2;
      const releaseLatch =
        sectionTop > vh * 0.2 ||
        section.getBoundingClientRect().bottom < navH + pinViewport * 0.25;

      if (shouldLatch && !releaseLatch) {
        if (!latchedRef.current) {
          latchedRef.current = true;
          latchScrollRef.current = scrolledInto;
          latchStartMsRef.current = performance.now();
          latchSnapRef.current = 0;
        }
      } else if (releaseLatch) {
        latchedRef.current = false;
        latchScrollRef.current = null;
        latchSnapRef.current = 1;
      }

      let snap = latchSnapRef.current;
      if (latchedRef.current && snap < 1) {
        const t = clamp01(
          (performance.now() - latchStartMsRef.current) /
            COMPARE_CONFIG.latchSettleMs,
        );
        snap = easeOutCubic(t);
        latchSnapRef.current = snap;
      }

      let animProgress = 0;
      if (
        latchedRef.current &&
        pinTrack > 0 &&
        latchScrollRef.current !== null
      ) {
        const pinScrolled = scrolledInto - latchScrollRef.current;
        animProgress = clamp01(pinScrolled / pinTrack);
      }

      setProgress(animProgress);
      setIsLatched(latchedRef.current);
      setLatchSnap(snap);
      setPinTrackPx(pinTrack);
      setSpreadStagePx(spreadStageRef.current);
      setReady(true);
    };

    const unsub = subscribeSmoothScrollTick(measure);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      unsub();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [
    sectionRef,
    introRef,
    stageRef,
    isStatic,
    longestColumnCardCount,
  ]);

  return {
    progress,
    ready,
    isStatic,
    isLatched,
    latchSnap,
    pinTrackPx,
    spreadStagePx,
  };
}

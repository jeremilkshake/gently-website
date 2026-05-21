// src/lib/compare/useCompareScroll.ts
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { subscribeSmoothScrollTick } from "@/lib/smoothScroll";
import { COMPARE_CONFIG } from "./config";
import {
  compareScrollMetrics,
  easeOutCubic,
  type CompareScrollPlacement,
} from "./progress";

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
  /** 0..1 collapse + release while the stage is stuck (0 = spread). */
  progress: number;
  ready: boolean;
  isStatic: boolean;
  /** Stage is in the sticky pin zone (intro scrolled past). */
  isLatched: boolean;
  /** 0..1 soft settle when the stage first sticks. */
  latchSnap: number;
  /** Scroll runway below the stage (px). */
  pinTrackPx: number;
}

/**
 * One scroll pass: intro scrolls away → sticky stage under nav → collapse + release.
 */
export function useCompareScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  introRef: React.RefObject<HTMLElement | null>,
  _stageRef: React.RefObject<HTMLElement | null>,
  longestColumnCardCount: number,
  placement: CompareScrollPlacement = "default",
): CompareScrollState {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [isLatched, setIsLatched] = useState(false);
  const [latchSnap, setLatchSnap] = useState(1);
  const [pinTrackPx, setPinTrackPx] = useState(0);

  const isStatic = useCompareStaticMode();
  const inPinZoneRef = useRef(false);
  const latchSnapRef = useRef(1);
  const latchStartMsRef = useRef(0);

  useEffect(() => {
    if (isStatic) {
      setReady(true);
      return;
    }

    const { scrollTrackVh } = compareScrollMetrics(
      longestColumnCardCount,
      placement,
    );

    const measure = () => {
      const section = sectionRef.current;
      const intro = introRef.current;
      if (!section) return;

      const vh = window.innerHeight;
      const pinTrack = scrollTrackVh * vh;
      const introH = intro?.offsetHeight ?? 0;
      const pinTrackStart = introH;
      const pinTrackEnd = pinTrackStart + pinTrack;

      const sectionTop = section.getBoundingClientRect().top;
      const scrolledInto = Math.max(0, -sectionTop);

      const animProgress =
        pinTrack > 0
          ? clamp01((scrolledInto - pinTrackStart) / pinTrack)
          : 0;

      const inPinZone =
        scrolledInto >= pinTrackStart - 2 && scrolledInto <= pinTrackEnd + 8;

      if (inPinZone && !inPinZoneRef.current) {
        inPinZoneRef.current = true;
        latchStartMsRef.current = performance.now();
        latchSnapRef.current = 0;
      } else if (!inPinZone) {
        inPinZoneRef.current = false;
        latchSnapRef.current = 1;
      }

      let snap = latchSnapRef.current;
      if (inPinZoneRef.current && snap < 1) {
        const t = clamp01(
          (performance.now() - latchStartMsRef.current) /
            COMPARE_CONFIG.latchSettleMs,
        );
        snap = easeOutCubic(t);
        latchSnapRef.current = snap;
      }

      setProgress(animProgress);
      setIsLatched(inPinZone);
      setLatchSnap(snap);
      setPinTrackPx(pinTrack);
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
  }, [sectionRef, introRef, isStatic, longestColumnCardCount, placement]);

  return {
    progress,
    ready,
    isStatic,
    isLatched,
    latchSnap,
    pinTrackPx,
  };
}

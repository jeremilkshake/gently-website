"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { notifySmoothScrollTick } from "@/lib/smoothScroll";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.6,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      notifySmoothScrollTick();
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}

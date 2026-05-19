"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/nav/Nav";
import { cn } from "@/lib/utils";

/** Near-zero so the bar reacts on the first meaningful tick of scroll direction */
const DELTA_THRESHOLD = 1;
/** Always show the full header when near the top of the page */
const TOP_ALWAYS_VISIBLE = 40;

export default function SiteHeader() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    /* Slight delay so chrome fades in just before hero copy begins (hero uses ~50ms delayChildren) */
    const timer = window.setTimeout(() => setIntroVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y <= TOP_ALWAYS_VISIBLE) {
        setHeaderHidden(false);
        return;
      }
      if (delta > DELTA_THRESHOLD) setHeaderHidden(true);
      else if (delta < -DELTA_THRESHOLD) setHeaderHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] flex flex-col overflow-visible will-change-transform",
        (!introVisible || headerHidden) && "pointer-events-none",
      )}
      initial={false}
      animate={{
        y: introVisible && headerHidden ? "-100%" : "0%",
        opacity: introVisible ? 1 : 0,
      }}
      transition={{
        y: {
          duration: headerHidden ? 0.09 : 0.11,
          ease: headerHidden ? [0.4, 0, 1, 1] : [0.2, 1, 0.35, 1],
        },
        opacity: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <Nav />
    </motion.div>
  );
}

/** Lenis tick subscribers — measure scroll-driven UI after Lenis updates each frame. */
const listeners = new Set<() => void>();

export function subscribeSmoothScrollTick(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notifySmoothScrollTick(): void {
  listeners.forEach((fn) => fn());
}

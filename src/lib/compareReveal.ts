/** Left-to-right reveal clip (Q2Q / Framer headline & header fill). */
export function horizontalRevealClip(fill: number): string {
  const reveal = Math.min(1, Math.max(0, fill));
  return `inset(0 ${(1 - reveal) * 100}% 0 0)`;
}

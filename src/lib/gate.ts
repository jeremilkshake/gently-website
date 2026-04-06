/** HttpOnly session cookie set by /api/auth/login; verified in middleware */
export const GATE_COOKIE_NAME = "gg_session";

export function gateIsEnabled(): boolean {
  return process.env.GATE_ENABLED !== "false";
}

export type Audience = "individual" | "business";

export type Pillar = "estate" | "admin" | "wellbeing";

export interface PillarData {
  id: Pillar;
  icon: string;
  num: string;
  name: string;
  desc: string;
  accentVar: string;
  headline: string;
  lede: string;
  features: string[];
  impactNum: string;
  impactLabel: string;
}

export interface Testimonial {
  user: string;
  source: string;
  quote: string;
}

export interface TestimonialsSectionContent {
  headline: string;
  subhead: string;
}

export interface GatePageContent {
  brand: string;
  tagline: string;
  /** Small label above headline (e.g. “Early access”) */
  earlyAccessKicker: string;
  earlyAccessHeadline: string;
  /** One short paragraph — invite-only + password/confidentiality */
  earlyAccessBody: string;
  /** Short line under the access button */
  accessPhasePasswordHint: string;
  /** Short line under the button */
  accessButtonSubtext: string;
  accessCta: string;
  /** Gate hero — lines of words (word-by-word reveal); each string is one word token */
  headlineLines: string[][];
  /** Opens the explanatory modal (shown beside Early Access on first paint) */
  infoCta: string;
  /** Title on the info modal */
  infoModalTitle: string;
  /** Dismisses the info modal */
  infoCloseCta: string;
  /** Shown above the waitlist link in the info modal */
  waitlistIntro: string;
  waitlistCta: string;
  waitlistUrl: string;
  passwordTitle: string;
  passwordPlaceholder: string;
  submitCta: string;
  cancel: string;
  wrongPassword: string;
  networkError: string;
}

export interface NavDropdownItem {
  title: string;
  desc?: string;
  href: string;
  color?: string;
  /** If set, clicking the link switches audience before scrolling (e.g. B2B anchors). */
  switchAudience?: Audience;
}

export interface B2BSolution {
  icon: string;
  title: string;
  desc: string;
  href: string;
  /** In-page anchor for nav deep links */
  anchorId: string;
}

export interface WhoCard {
  title: string;
  body: string;
}

export interface WhoSectionContent {
  kicker: string;
  /** Shown after the logo in the headline (e.g. "is for.") */
  headlineSuffix: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProblemItem {
  title: string;
  body: string;
}

export interface ProblemSectionContent {
  tag: string;
  headline: string;
  subhead: string;
  items: ProblemItem[];
}

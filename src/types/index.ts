export type Audience = "individual" | "business";

/** Sticky audience bar — partners (B2B) vs families (individual). */
export interface AudienceToggleContent {
  partners: string;
  families: string;
}

/** Nav deep links in Solution — `id="pillar-{anchor}"` on one row each */
export type SolutionPillarAnchor = "estate" | "admin" | "wellbeing";

export interface SolutionCareAccordionItem {
  id: string;
  title: string;
  body: string;
  /** Optional second paragraph (e.g. professional support) */
  bodySecondary?: string;
  /** Optional bullet list under the body */
  bullets?: string[];
  pillarAnchor?: SolutionPillarAnchor;
}

export interface SolutionCareSectionContent {
  kicker: string;
  headline: string;
  subhead: string;
  accordions: SolutionCareAccordionItem[];
}

/** Compare / “The difference” headline (two lines) + right column “all done” panel */
export interface CompareSupportCopyVariant {
  line1: string;
  line2: string;
  /** Same role as WITH[].title — headline row in the final panel */
  donePanelTitle: string;
  /** Body under the title when the With Gently column reaches “Done” */
  donePanelBody: string;
}

export interface ImpactStat {
  num: string;
  label: string;
  color: string;
}

export interface ImpactSectionContent {
  headline: string;
  stats: ImpactStat[];
}

/** Closing CTA — question headline + delight subhead + links */
export interface CtaSectionVariant {
  headlineBeforeBreak: string;
  headlineQuestion: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
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

export interface ScienceResearcher {
  name: string;
  role: string;
  quote: string;
}

export interface ScienceSectionContent {
  kicker: string;
  headline: string;
  /** 1–2 very short lines — easy to skim */
  subheadLines: string[];
  researchers: ScienceResearcher[];
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

export interface FooterLink {
  label: string;
  href: string;
  switchAudience?: Audience;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface B2BSolution {
  icon: string;
  title: string;
  desc: string;
  /** Short line in the Partners nav dropdown */
  dropdownDesc: string;
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

/** Business-only stat strip — short, scannable claims under the hero/intro. */
export interface BusinessStatStripItem {
  /** Big eyebrow value, e.g. "1 platform", "3 pillars", "0 integration" */
  value: string;
  /** Short supporting label */
  label: string;
}

export interface BusinessStatStripContent {
  kicker: string;
  headline: string;
  subhead: string;
  stats: BusinessStatStripItem[];
}

/** Business-only partnership steps — 4-step "how partnership works" block. */
export interface BusinessPartnershipStep {
  num: number;
  title: string;
  body: string;
}

export interface BusinessPartnershipContent {
  kicker: string;
  headline: string;
  subhead: string;
  steps: BusinessPartnershipStep[];
}

/** Business-only compare table — Gently vs alternatives. */
export interface BusinessCompareColumn {
  /** Column heading, e.g. "Gently", "EAP only", "Bereavement leave only", "Nothing" */
  name: string;
  /** Optional tagline under the heading */
  tagline?: string;
  /** Flag for visual emphasis on the Gently column */
  highlight?: boolean;
}

export type BusinessCompareCell = boolean | string;

export interface BusinessCompareRow {
  /** Row label (the capability being compared) */
  feature: string;
  /** One cell per column, in the same order as `columns` */
  cells: BusinessCompareCell[];
}

export interface BusinessCompareTableContent {
  kicker: string;
  headline: string;
  subhead: string;
  columns: BusinessCompareColumn[];
  rows: BusinessCompareRow[];
  footnote?: string;
}

/** Business-only — "Why partner with Gently" feature carousel. */
export interface BusinessWhyPartnerCard {
  /** Key into the icon map in the component (e.g. "lock", "network") */
  icon: string;
  title: string;
  body: string;
}

export interface BusinessWhyPartnerContent {
  kicker: string;
  headline: string;
  subhead: string;
  cards: BusinessWhyPartnerCard[];
}

/** Business-only pricing/model block. Mirrors EverSettled's "free for X, paid by Y" framing. */
export interface BusinessPricingTier {
  audience: string;
  price: string;
  priceSuffix: string;
  paidBy: string;
  features: string[];
}

export interface BusinessPricingModelContent {
  kicker: string;
  headline: string;
  subhead: string;
  tiers: BusinessPricingTier[];
  footnote: string;
}

/** Floating chat widget — audience-specific greeting */
export interface ChatWidgetVariant {
  headerSubtext: string;
  welcomeMessages: string[];
}

/** Floating chat widget — lead capture via email + first message */
export interface ChatWidgetContent {
  launcherLabel: string;
  agentName: string;
  individual: ChatWidgetVariant;
  business: ChatWidgetVariant;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendAriaLabel: string;
  closeAriaLabel: string;
  timestampJustNow: string;
  invalidEmail: string;
  emptyMessage: string;
  sendingLabel: string;
  thankYouMessage: string;
  errorMessage: string;
  networkError: string;
}

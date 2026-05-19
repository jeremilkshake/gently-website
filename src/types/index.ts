export type Audience = "individual" | "business";

export type PartnerSlug =
  | "hospice-hospitals"
  | "employers"
  | "consultants"
  | "financial-institutions"
  | "funeral-homes"
  | "education-institutions";

/** Neutral home — individuals vs partners chooser cards */
export interface HomeChooserCard {
  label: string;
  body: string;
  closing: string;
  href: string;
  continueLabel?: string;
}

export interface HomeChooserContent {
  headline: string;
  subhead: string;
  intro: string;
  families: HomeChooserCard;
  partners: HomeChooserCard;
}

/** `/company/mission` page */
export interface MissionPageContent {
  kicker: string;
  headline: string;
  subhead: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
}

/** `/company/contact` — split layout + inquiry form */
export interface ContactPageContent {
  kicker: string;
  headline: string;
  quote: {
    text: string;
    attribution: string;
  };
  form: {
    firstName: { label: string; placeholder: string };
    lastName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    country: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    title: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
    privacyPrefix: string;
    privacyLinkLabel: string;
    privacyHref: string;
    submitLabel: string;
    submittingLabel: string;
    consentRequired: string;
    invalidEmail: string;
    messageRequired: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    networkError: string;
  };
}

/** Per-vertical partner landing (`/partners/[slug]`) */
export interface PartnerPageHeroContent {
  kicker: string;
  headline: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
}

export interface PartnerPageContent {
  slug: PartnerSlug;
  hero: PartnerPageHeroContent;
  problem: ProblemSectionContent;
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

export interface CompareScrollStep {
  title: string;
  body: string;
}

export interface CompareScrollWithStep extends CompareScrollStep {
  num: number;
}

export interface CompareScrollLabels {
  kicker: string;
  beforeAfterEmphasis: string;
  withoutTitle: string;
  withTitle: string;
  withoutDoneBadge: string;
  withoutHoursUnit: string;
  withSavePrefix: string;
  withHoursUnit: string;
  withDoneBadge: string;
  mobileWithoutTab: string;
  mobileWithTab: string;
}

export interface CompareScrollAudienceContent extends CompareSupportCopyVariant {
  labels: CompareScrollLabels;
  withoutSteps: CompareScrollStep[];
  withSteps: CompareScrollWithStep[];
  maxWithoutHours: number;
  maxSavedHours: number;
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

/** Business-only — executive / leader quote block (e.g. HSBC HR). */
export interface PartnerLeaderQuoteContent {
  paragraphs: string[];
  organization: string;
  attribution: string;
  learnMoreLabel: string;
  learnMoreHref: string;
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
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface B2BSolution {
  icon: string;
  iconSrc?: string;
  iconScale?: number;
  title: string;
  desc: string;
  /** Short line in the Partners nav dropdown */
  dropdownDesc: string;
  /** Route segment under `/partners/` */
  slug: PartnerSlug;
  href: string;
  /** Legacy in-page anchor — kept for hub section ids */
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
  /** Lucide icon key — see `Problem.tsx` icon map */
  icon?: string;
}

/** Rotating phrase in the familiar problem narrative headline. */
export interface ProblemFamiliarNarrative {
  /** Lead-in before the slot, e.g. "You have to grieve — whilst also managing your loved one's" */
  prefix: string;
  /** Optional closing after the slot, e.g. "." */
  suffix?: string;
}

/** One row in the For You familiar accordion (left) + detail panel (right). */
export interface ProblemFamiliarTopic {
  id: string;
  title: string;
  /** Short grammar-friendly label for the narrative slot (synced with accordion) */
  slotLabel: string;
  /** Expanded accordion copy */
  body: string;
  /** Topic illustration — see docs/problem-topic-graphics-brief.md */
  imageSrc: string;
  imageAlt: string;
}

/** Grouped rows in the right-hand detail card */
export interface ProblemFamiliarPanelGroup {
  label: string;
  points: string[];
  /** Brand illustration in public/images */
  imageSrc: string;
  imageAlt: string;
}

/** Optional lead-in for the For You problem section (accordion + panel). */
export interface ProblemFamiliarIntro {
  /** Prompt above the narrative, e.g. "Does any of this feel familiar?" */
  eyebrow: string;
  narrative: ProblemFamiliarNarrative;
  panelSubtitle: string;
  panelStatus: string;
  panelGroups: ProblemFamiliarPanelGroup[];
  topics: ProblemFamiliarTopic[];
  /** Last topic id still fully in the clipped accordion viewport */
  accordionClipAfterId: string;
  /** Ms per topic before auto-advance */
  topicIntervalMs: number;
  reassurance: string;
}

export interface ProblemSectionContent {
  tag: string;
  headline?: string;
  subhead?: string;
  items: ProblemItem[];
  familiar?: ProblemFamiliarIntro;
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
  /** Short label on the timeline (e.g. "Partner", "Rollout") */
  milestone: string;
  title: string;
  body: string;
}

export interface BusinessPartnershipContent {
  kicker: string;
  headline: string;
  subhead: string;
  steps: BusinessPartnershipStep[];
}

/** For You — vertical “how it works” timeline after bereavement intro */
export interface CustomApproachStep {
  num: number;
  title: string;
  body?: string;
  bodySecondary?: string;
  footnote?: {
    beforeLink: string;
    linkLabel: string;
    href: string;
  };
}

export interface CustomApproachSectionContent {
  kicker: string;
  headline: string;
  appDownloadLabel: string;
  appDownloadHref: string;
  steps: CustomApproachStep[];
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
  /** Optional brand image — replaces the Lucide icon when set */
  iconSrc?: string;
  /** Visual scale when artwork has extra padding (default 1) */
  iconScale?: number;
  title: string;
  body: string;
}

export interface BusinessWhyPartnerContent {
  heading?: string;
  kicker: string;
  tagline?: string;
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

import type {
  Testimonial,
  B2BSolution,
  WhoCard,
  FaqItem,
  NavDropdownItem,
  ProblemSectionContent,
  WhoSectionContent,
  TestimonialsSectionContent,
  GatePageContent,
  SolutionCareSectionContent,
  SolutionCareAccordionItem,
  ImpactSectionContent,
  CtaSectionVariant,
  CompareSupportCopyVariant,
  FooterColumn,
  ScienceSectionContent,
  BusinessStatStripContent,
  BusinessPartnershipContent,
  BusinessCompareTableContent,
  BusinessPricingModelContent,
  BusinessWhyPartnerContent,
  ChatWidgetContent,
  AudienceToggleContent,
} from "@/types";

/** Primary intro call — Calendly 30 min */
export const bookingUrl = "https://calendly.com/jeremy-grievegently/30min";

/** Spread onto `<a href={bookingUrl} {...openExternalTab}>` for external booking links */
export const openExternalTab = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

/** Sticky audience toggle — inclusive labels (maps to business / individual in code). */
export const audienceToggle: AudienceToggleContent = {
  partners: "For Partners",
  families: "For Families",
};

/** Top nav — Partners dropdown trigger label */
export const navPartnersMenu = "Partners";

/** Full-screen access layer on the marketing home when the gate is enabled */
export const marketingAccessGate = {
  lead: "You’re on the main site. Enter the access code below to unlock the full page.",
  misconfigured:
    "Gate is not configured. Set GATE_JWT_SECRET and SITE_ACCESS_PASSWORD on the server.",
} as const;

/** Stealth gate UI — legacy /gate route (redirects to home) */
export const gatePage: GatePageContent = {
  brand: "gently",
  tagline: "Estate, admin & wellbeing after loss",
  earlyAccessKicker: "Early access",
  earlyAccessHeadline: "Private preview of gently. The public site is not live.",
  earlyAccessBody:
    "gently is in a closed phase for invited participants only, while we continue development and validation. Access and rollout are deliberately limited so we can maintain quality and a responsible standard of care. Select Early Access and enter the password you were given. Please treat this preview as confidential.",
  accessPhasePasswordHint:
    "Phase 1 is restricted to support structured testing and feedback before wider availability.",
  accessButtonSubtext:
    "Need credentials? Contact whoever supplied this link.",
  accessCta: "Early Access",
  headlineLines: [
    ["Grief", "shouldn't", "feel", "like", "admin."],
    ["Let", "us", "handle", "the", "paperwork,"],
    ["You", "handle", "the", "human", "stuff."],
  ],
  infoCta: "Info",
  infoModalTitle: "About this preview",
  infoCloseCta: "Close",
  waitlistIntro:
    "Don’t have a password yet? Use the button below, it opens the early access form in a new tab so you can join the waitlist.",
  waitlistCta: "Join the early access waitlist",
  waitlistUrl: "https://tally.so/r/GxDVO2",
  passwordTitle: "Enter the access code",
  passwordPlaceholder: "Password",
  submitCta: "Enter",
  cancel: "Cancel",
  wrongPassword: "That password isn’t right. Try again.",
  networkError: "Something went wrong. Check your connection and try again.",
};

/** Public paths for the password-gate screen header */
export const gateScreenAssets = {
  taglineSvg: "/gate-assets/tagline-for-you.svg",
  /** Gate background; bump `introVersion` after replacing the file to bust CDN/browser cache */
  introSvg: "/gate-assets/intro.svg",
  introVersion: "20260206",
} as const;

/** Nav + footer labels when the stealth gate may be active */
export const gateAuthUi = {
  login: "Login",
  logout: "Logout",
} as const;

/** Hero visual asset */
export const heroVisual = {
  src: "/images/hero-support-collage.svg",
  alt: "Platform preview showing estate overview, guided support, and admin task progress.",
} as const;

export const heroBadgeText = "Made with care for people carrying something heavy.";

/** Business hero — inline trust pills under the CTAs (icon + short label). */
export const heroBusinessTrustBadges = [
  { icon: "heart", label: "Free for your people" },
  { icon: "shield", label: "Secure & Private" },
] as const;

/** Primary hero button — opens booking (Calendly) */
export const heroBookingCta = "Book a Demo";

/** Primary hero button on the business tab — opens booking (Calendly) */
export const heroBusinessBookingCta = "Become a Partner";

/** Business hero — lede under the headline */
export const heroBusinessLede =
  "Gently helps standardise bereavement support across your organisation. Families get one secure pathway for estate, admin, and grief wellbeing, completely free for them. When loss happens, they have everything in one place.";

export const bereavementIntro = {
  headline: "A modern approach to bereavement support",
  brand: "gently.",
  body: "is a new kind of bereavement support. Modern, professional, and grounded in personalised care. We’re by your side, every step of the way. We handle the admin, so you can handle your heart.",
} as const;

export const trustBar = {
  label: "Trusted by industry leaders",
  logos: [
    "Funeral Homes",
    "Insurance Providers",
    "Legal Partners",
    "Probate Services",
    "Estate Planning Firms",
    "Employee Benefits Teams",
    "Bereavement Charities",
    "Financial Advisors",
  ],
} as const;

/** Trust signals shown as a row of small icon + label pills below the marquee. */
export const trustBarBadges = [
  { icon: "shield", label: "Enterprise-Grade Security" },
  { icon: "mappin", label: "Developed in the UK" },
  { icon: "users", label: "100+ families helped" },
] as const;

export const compareSupportCopy: {
  individual: CompareSupportCopyVariant;
  business: CompareSupportCopyVariant;
} = {
  individual: {
    line1: "Personalise your grief support.",
    line2: "Reclaim your time.",
    donePanelTitle: "Now you can focus on healing",
    donePanelBody:
      "The paperwork is handled. The calls are made. The plan is in place. Focus now on being human and healing.",
  },
  business: {
    line1: "Complete coverage. Measurable impact.",
    line2: "One platform. Estate, admin, wellbeing.",
    donePanelTitle: "Your people return ready, not wrecked",
    donePanelBody:
      "The estate is handled. The admin is closed out. Grief support is in place. Your employees come back to work with capacity, not chaos.",
  },
};

/** Pain section — Reddit-style social proof card */
export const painRedditCard = {
  metaLine: "u/anonymous · r/GriefSupport",
  quote:
    "Nobody told me grief would feel this physical. I just lie there at 3am waiting for morning.",
} as const;

export const navBusinessCta = {
  body: "Complete bereavement coverage for your workforce",
  linkLabel: "Become a Partner →",
} as const;

export const ctaSection: {
  individual: CtaSectionVariant;
  business: CtaSectionVariant;
} = {
  individual: {
    headlineBeforeBreak: "Ready for relief",
    headlineQuestion: "after loss?",
    subhead:
      "More room for what matters: tenderness, rest, memory. While gently handles the practical: clearer steps, less paperwork, fewer surprises.",
    primaryCta: "Request a demo",
    secondaryCta: "See how it works",
    secondaryHref: "#solution",
  },
  business: {
    headlineBeforeBreak: "Ready to give your people",
    headlineQuestion: "the gift of complete support after loss?",
    subhead:
      "One platform. Three pillars. No technical integration. Book a 30-minute partnership call to see Gently in action and get a quote tailored to your organisation.",
    primaryCta: "Become a Partner",
    secondaryCta: "View solutions",
    secondaryHref: "#b2b",
  },
} as const;

export const problemSection: {
  individual: ProblemSectionContent;
  business: ProblemSectionContent;
} = {
  individual: {
    tag: "The problem",
    headline: "Loss doesn't arrive in neat boxes.",
    subhead:
      "Estate, admin, and grief land together, yet most people are left to stitch it all together on their own.",
    items: [
      {
        title: "Everything lives in different places",
        body: "Spreadsheets, solicitor emails, bank portals, and late-night searches, and nothing talks to anything else.",
      },
      {
        title: "The admin doesn't pause for grief",
        body: "Notifications, deadlines, and paperwork keep coming when your mind is somewhere else entirely.",
      },
      {
        title: "You're told to cope, not equipped to",
        body: "Platitudes don't explain 3am wakeups or form fatigue. You need clarity and practical support, not silence.",
      },
    ],
  },
  business: {
    tag: "The problem",
    headline: "The hidden cost of bereavement at work.",
    subhead:
      "Most employers offer 3–5 days of leave and an EAP link. The estate, admin, and emotional load run for 12–18 months. The gap is where productivity, retention, and trust quietly erode.",
    items: [
      {
        title: "Invisible Productivity Loss",
        body: "Grieving employees return on day six and operate at a fraction of capacity for months. The cost is real — and currently unmeasured on your dashboard.",
      },
      {
        title: "Fragmented Support Stack",
        body: "Legal benefits don’t touch grief. Wellbeing apps don’t touch probate. Employees end up coordinating their own care during the worst weeks of their lives.",
      },
      {
        title: "Retention & Trust Risk",
        body: "When people feel abandoned after loss, engagement scores drop and quiet quitting begins. The exit interview rarely names bereavement, but the timing does.",
      },
    ],
  },
};

export const impactSection: ImpactSectionContent = {
  headline: "Proven impact across all three pillars.",
  stats: [
    {
      num: "< 30 min",
      label: "to map your full estate\nwith AI visualisations",
      color: "var(--accent)",
    },
    {
      num: "300+ hrs",
      label: "saved per family over\n18 months on average",
      color: "var(--blue)",
    },
    {
      num: "94 lessons",
      label: "across grief, health &\nlegacy support",
      color: "var(--green)",
    },
  ],
};

/** Shared accordion rows — same journeys; framing is in the section headline/subhead */
const solutionCareAccordions: SolutionCareAccordionItem[] = [
  {
    id: "funeral",
    title: "Planning a funeral",
    body:
      "Thoughtful help choosing a funeral director that fits where you live, what you believe, and what your family needs, without cold calls when your head is already full.",
    pillarAnchor: "admin",
  },
  {
    id: "benefits",
    title: "Claiming benefits",
    body:
      "We help you spot what your family may be entitled to, in plain language, so nothing slips past in the rush of paperwork.",
  },
  {
    id: "accounts",
    title: "Managing accounts",
    body:
      "Cancelling subscriptions, closing accounts, and stopping the small recurring jobs that pile up, we lift that off your plate so you can breathe.",
  },
  {
    id: "grief",
    title: "Getting grief support",
    pillarAnchor: "wellbeing",
    body:
      "Gentle resources for hard days: short, honest, and free of jargon. Inside gently you’ll find expert-written wellbeing courses you can start, pause, and come back to: built for real life, not perfect days.",
    bodySecondary:
      "When you need someone beside the screen, we help connect you with professional bereavement and counselling support. People who do this work every day, matched to what you need so you’re not guessing who to call or carrying it all alone.",
    bullets: [
      "16 self-guided courses from grief and wellness specialists",
      "94 bite-sized lessons with practical skills you can actually use",
      "Topics that meet you where you are: sleep, your body, memory, and the wobbly days",
      "53 science-informed tools for real moments: before work, after midnight, whenever you need them",
    ],
  },
  {
    id: "house",
    title: "Dealing with the house",
    body:
      "Clearer steps for the home: bills, upkeep, and decisions that can’t wait, so you’re not guessing alone with a key in your hand.",
  },
  {
    id: "probate",
    title: "Navigating probate",
    body:
      "Guidance through probate and closing the estate in words you can follow, at a pace you can hold, alongside professionals when you need them.",
    pillarAnchor: "estate",
  },
];

/** Solution — care team accordion (left headline, right grid) */
export const solutionCareSection: {
  individual: SolutionCareSectionContent;
  business: SolutionCareSectionContent;
} = {
  individual: {
    kicker: "The solution",
    headline: "An entire Care Team, by your side.",
    subhead:
      "Practical help for the jobs nobody rehearses for: funerals, forms, the house, probate, and the days that feel too loud or too quiet. One calm place to turn.",
    accordions: solutionCareAccordions,
  },
  business: {
    kicker: "How it works",
    headline: "A complete Care Team, deployed as a benefit.",
    subhead:
      "Every employee, member, or client facing loss gets a dedicated team across all three pillars — estate, admin, and wellbeing. One contract. One platform. No technical integration required.",
    accordions: solutionCareAccordions,
  },
};

export const testimonialsSection: TestimonialsSectionContent = {
  headline: "Kind words from people who get it.",
  subhead: "Little messages from forums, circles, and early friends of gently: warm, rough, real.",
};

export const testimonials: Testimonial[] = [
  {
    user: "Moira L.",
    source: "Peer group · Yorkshire",
    quote:
      "Didn’t think an app could feel gentle. The 3am bit about your body, I cried in the car, then breathed. I needed that.",
  },
  {
    user: "Jay H.",
    source: "r/Grief",
    quote:
      "Work thinks I’m fine. People here said the same ‘fine.’ Felt less alone, straight away.",
  },
  {
    user: "Sam T.",
    source: "Private preview",
    quote:
      "Mapped the estate in one go. Walked away lighter, like someone laid the mess out without judging.",
  },
  {
    user: "Rob M.",
    source: "Men’s circle · London",
    quote:
      "Rubbish at feelings talk. The science bits felt safe, no drama, just truth. That helped.",
  },
  {
    user: "Amina K.",
    source: "Forum thread",
    quote:
      "Probate was eating my evenings. Drafts and a clear next step, I slept again. Thank you.",
  },
  {
    user: "The Okonkwo family",
    source: "Young loss meet-up",
    quote:
      "We’re messy and tired together. One place for tears and forms, we didn’t have that before.",
  },
];

export const scienceSection: ScienceSectionContent = {
  kicker: "The research",
  headline: "Evidence-led care, not guesswork.",
  subheadLines: [
    "gently is shaped by published grief and resilience science.",
    "These voices show the thinking behind it.",
  ],
  researchers: [
    {
      name: "Mary-Frances O'Connor",
      role: "Grief researcher · University of Arizona",
      quote:
        "Grieving is a form of learning. And learning takes time and experience, and our brain is doing its best to help us. But it’s going to take some time.",
    },
    {
      name: "George Bonanno",
      role: "Resilience researcher · Columbia University",
      quote:
        "Grief does not require prolonged impairment. Most bereaved individuals show resilience, with stable function alongside periods of difficulty.",
    },
    {
      name: "Kristin Neff",
      role: "Self-compassion researcher · UT Austin",
      quote:
        "People who treat themselves with care process grief more effectively. Self-compassion is one of the most evidence-supported predictors of healthy grief adjustment.",
    },
  ],
};

export const b2bSection = {
  kicker: audienceToggle.partners,
  headline: "Support your people through loss.",
} as const;

export const b2bSolutions: B2BSolution[] = [
  {
    icon: "🕊️",
    title: "For Hospice and Hospitals",
    dropdownDesc: "Support patients and families through loss with dignity",
    desc: "Extend bereavement care beyond the bedside. Give families one calm place for estate, admin, and grief support — while your teams stay focused on clinical care.",
    href: bookingUrl,
    anchorId: "b2b-hospice-hospitals",
  },
  {
    icon: "🏢",
    title: "For Employers",
    dropdownDesc: "Help employees bring their whole selves back to work",
    desc: "Reduce bereavement-related absence and turnover. Offer complete estate, admin, and grief support as an employee benefit — free for your people, paid by the organisation.",
    href: bookingUrl,
    anchorId: "b2b-employers",
  },
  {
    icon: "💼",
    title: "For Consultants",
    dropdownDesc: "Proven solutions to meet your clients' needs",
    desc: "White-label the full platform or integrate a single pillar. Win retention and differentiate your offering with the only complete bereavement product on the market.",
    href: bookingUrl,
    anchorId: "b2b-consultants",
  },
  {
    icon: "🏦",
    title: "For Financial Institutions",
    dropdownDesc: "Deepen client trust through full-circle support",
    desc: "Deepen client trust through full-circle estate and legacy support. From planning through bereavement — one platform, your brand.",
    href: bookingUrl,
    anchorId: "b2b-financial",
  },
  {
    icon: "🏥",
    title: "For Health Plans",
    dropdownDesc: "Give your members the care they deserve",
    desc: "Member-facing grief wellbeing as a covered benefit. Evidence-based, expert-designed, measurably effective — no integration burden.",
    href: bookingUrl,
    anchorId: "b2b-health-plans",
  },
];

/** Partners nav dropdown — derived from b2bSolutions so labels stay in sync */
export const businessDropdown: NavDropdownItem[] = b2bSolutions.map((s) => ({
  title: s.title,
  desc: s.dropdownDesc,
  href: `#${s.anchorId}`,
  switchAudience: "business",
}));

/** Business-only — short stat strip under the partnership intro. */
export const businessStatStrip: BusinessStatStripContent = {
  kicker: "The Gently difference",
  headline: "One platform. Three pillars. Zero integration burden.",
  subhead:
    "Gently is the only platform that covers the full bereavement journey — estate, admin, and grief wellbeing — under a single contract.",
  stats: [
    { value: "1", label: "platform across\nestate, admin & wellbeing" },
    { value: "3", label: "pillars of support\nfor every person you cover" },
    { value: "0", label: "technical integration\nrequired to deploy" },
    { value: "12–18 mo", label: "of support per person,\nnot 3–5 days of leave" },
  ],
};

/** Business-only — "Why partner with us" feature carousel. */
export const businessWhyPartner: BusinessWhyPartnerContent = {
  heading: "A new standard for bereavement support.",
  kicker: "Why partner with us",
  tagline: "The UK's trusted bereavement partner.",
  headline: "Empower families to prepare while they still can.",
  subhead:
    "Gently helps patients and families navigate funeral planning, estate settlement, and everything that comes after a loss. It acts as a secure digital vault where families can store important information and documents — so when loss happens, they don’t have to search. Everything is already organised and ready.",
  cards: [
    {
      icon: "lock",
      title: "Secure Digital Vault",
      body: "Families securely store wills, deeds, insurance policies, account information, and personal instructions — all in one encrypted place.",
    },
    {
      icon: "network",
      title: "Estate Visualisation",
      body: "An interactive map of the full estate: assets, debts, accounts, and beneficiaries. Everything in one view, so nothing is hidden and nothing forgotten.",
    },
    {
      icon: "folder",
      title: "Document Organisation",
      body: "Upload and categorise every critical document. When the time comes, family members have instant access to everything they need.",
    },
    {
      icon: "share",
      title: "Share Documents",
      body: "Securely share specific documents with executors, solicitors, or family members. Granular permissions, a clear audit trail, no email attachments to chase.",
    },
    {
      icon: "checklist",
      title: "Guided Care Plan",
      body: "A step-by-step plan that walks patients and families through every task: registering the death, closing accounts, navigating probate, and the long tail after.",
    },
    {
      icon: "handoff",
      title: "Seamless Family Handoff",
      body: "All stored information is pre-filled for the family. They continue on the platform for estate settlement with minimal friction — no searching, no guessing.",
    },
    {
      icon: "heart",
      title: "Peace of Mind",
      body: "Knowing affairs are in order lets families focus on what matters most: time with loved ones, not paperwork.",
    },
    {
      icon: "free",
      title: "100% Free for Families",
      body: "Your organisation pays. Families never pay a cent. Full access for as long as they need it — no subscription, no upsell.",
    },
    {
      icon: "book",
      title: "Increased Grief Awareness",
      body: "16 expert-led courses and 94 science-backed lessons on grief, sleep, and resilience — built into the platform for the moments after loss.",
    },
  ],
};

/** Business-only — 4-step "how it works" block. */
export const businessPartnership: BusinessPartnershipContent = {
  kicker: "How it works",
  headline: "From signed partnership to a family that doesn’t have to search.",
  subhead:
    "Four steps from the day you partner with Gently to the day a family inherits a fully organised estate. No technical integration. Most partners are live with their people in under 30 days.",
  steps: [
    {
      num: 1,
      title: "Partner with Gently",
      body: "Your organisation signs as a partner. We provide co-branded materials, manager training, and a rollout plan tailored to your workforce, members, or clients.",
    },
    {
      num: 2,
      title: "Introduce",
      body: "HR, benefits leads, or care coordinators introduce Gently to the people you support. We provide the language, the assets, and the warm hand-off.",
    },
    {
      num: 3,
      title: "Individual prepares",
      body: "The person you support uses Gently at their own pace — building a secure vault, mapping their estate, organising documents, and tending to wellbeing alongside.",
    },
    {
      num: 4,
      title: "Family benefit",
      body: "When loss happens, family members, executors, and advisors inherit a fully organised estate. The Care Team continues alongside them through admin, probate, and grief.",
    },
  ],
};

/** Business-only — Gently vs alternatives compare table. */
export const businessCompareTable: BusinessCompareTableContent = {
  kicker: "How Gently compares",
  headline: "Most employers offer fragments. Gently covers the whole journey.",
  subhead:
    "The standard bereavement stack is a few days of leave, an EAP leaflet, and a hope that things settle down. Here is what your people are actually missing.",
  columns: [
    { name: "Gently", tagline: "Complete coverage", highlight: true },
    { name: "EAP only", tagline: "Counselling helpline" },
    { name: "Leave only", tagline: "3–5 days off" },
    { name: "No provision", tagline: "Status quo" },
  ],
  rows: [
    { feature: "Cost to your people", cells: ["Free", "Free", "Free", "Free"] },
    { feature: "Estate & probate support", cells: [true, false, false, false] },
    { feature: "Admin lift (banks, accounts, paperwork)", cells: [true, false, false, false] },
    { feature: "Grief wellbeing courses", cells: [true, "Limited", false, false] },
    { feature: "Dedicated Care Manager", cells: [true, false, false, false] },
    { feature: "Coverage duration", cells: ["12–18 months", "Sessions only", "3–5 days", "None"] },
    { feature: "Usage & outcomes reporting", cells: [true, "Partial", false, false] },
    { feature: "White-label / co-branding", cells: [true, false, false, false] },
    { feature: "Technical integration required", cells: ["None", "None", "None", "—"] },
  ],
  footnote:
    "EAPs serve a real purpose — but bereavement needs more than a helpline. Gently sits alongside your existing benefits, not in place of them.",
};

/** Individual — gently vs the usual alternatives after a loss. */
export const individualCompareTable: BusinessCompareTableContent = {
  kicker: "How gently compares",
  headline: "How gently compares to the usual ways of getting through it.",
  subhead:
    "Most families piece bereavement together from a solicitor, a stack of spreadsheets, and whoever picks up the phone. gently brings the whole thing into one calm place.",
  columns: [
    { name: "gently", tagline: "All-in-one care", highlight: true },
    { name: "Paper & PDFs", tagline: "Folder, drawer, inbox" },
    { name: "Solicitor", tagline: "Probate only" },
    { name: "Going it alone", tagline: "No support" },
  ],
  rows: [
    { feature: "Cost to your family", cells: ["Free", "Your time", "£2,000–£10,000+ + VAT", "£0"] },
    { feature: "Secure cloud storage", cells: [true, false, false, false] },
    { feature: "Guided checklist", cells: [true, false, "Legal only", false] },
    { feature: "Digital document upload", cells: [true, false, false, false] },
    { feature: "Accessible by family after passing", cells: [true, "Only if they find it", true, false] },
    { feature: "Estate settlement support", cells: ["Full platform", false, "Billable hours", false] },
    { feature: "Fire / flood / loss proof", cells: [true, false, false, false] },
    { feature: "Real-time sharing with executor, administrator or advisor", cells: [true, false, false, false] },
  ],
  footnote:
    "Solicitor fees reflect typical UK full estate administration (£2,000 to £10,000+ plus 20% VAT). gently sits alongside professionals, not in place of them. When legal advice is needed, we help you find someone you can trust.",
};

/** Business-only — pricing/model. Mirrors EverSettled's "free for X, paid by Y" framing. */
export const businessPricingModel: BusinessPricingModelContent = {
  kicker: "Transparent & simple pricing",
  headline: "Free for your people. Paid by the organisation.",
  subhead:
    "Your employees, members, or clients never pay. Your organisation pays a single per-person rate that covers the full Care Team across all three pillars.",
  tiers: [
    {
      audience: "For your people",
      price: "£0",
      priceSuffix: "always",
      paidBy: "100% free — no excess, no out-of-pocket.",
      features: [
        "Dedicated Care Manager",
        "Estate & probate guidance",
        "Admin handled on their behalf",
        "Science-based grief wellbeing courses",
        "Family delegation tools",
        "12–18 months of continuous support",
      ],
    },
    {
      audience: "For your organisation",
      price: "Custom",
      priceSuffix: "per covered person",
      paidBy: "Single contract. No integration fees. Quarterly reporting included.",
      features: [
        "Full platform deployed in under 30 days",
        "Co-branded materials & manager training",
        "Usage, satisfaction & outcomes reporting",
        "White-label option for consultants & financial institutions",
        "Dedicated partnership lead",
        "Volume pricing for 500+ covered people",
      ],
    },
  ],
  footnote:
    "Pricing scales with the number of people covered, not the number of losses. Become a partner to see a quote tailored to your organisation.",
};

/** Primary in-page targets for plain nav links */
export const navLoginHref = "#cta";

/** Footer link grid — hrefs match section ids on the home page */
export const footerColumns: FooterColumn[] = [
  {
    heading: "Solutions",
    links: [
      { label: "Care Team", href: "#solution" },
      { label: "Estate & legacy", href: "#pillar-estate" },
      { label: "Admin & logistics", href: "#pillar-admin" },
      { label: "Grief & wellbeing", href: "#pillar-wellbeing" },
    ],
  },
  {
    heading: navPartnersMenu,
    links: [
      { label: "Overview", href: "#b2b", switchAudience: "business" },
      ...b2bSolutions.map((s) => ({
        label: s.title,
        href: `#${s.anchorId}`,
        switchAudience: "business" as const,
      })),
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About gently", href: "#bereavement-intro" },
      { label: "The problem", href: "#problem" },
      { label: "The difference", href: "#compare" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#cta" },
      { label: "Terms", href: "#cta" },
      { label: "Crisis resources", href: "#faq" },
    ],
  },
];

export const whoSection: {
  individual: WhoSectionContent;
  business: WhoSectionContent;
} = {
  individual: {
    kicker: "Who it's for",
    headlineSuffix: "is for you, when your heart feels blue",
  },
  business: {
    kicker: "Who partners with us",
    headlineSuffix: "is built for organisations that take care seriously.",
  },
};

export const whoCards: WhoCard[] = [
  {
    title: "You didn’t get a roadmap. You got probate, panic, and paperwork in the same season.",
    body: "The estate hits while you’re still reeling. You shouldn’t need three apps, a solicitor, and a spreadsheet just to know what you own, what’s owed, and what has to happen next. One place for the whole tangle.",
  },
  {
    title: "You said yes to being executor, and inherited a job nobody trained you for.",
    body: "Forms, deadlines, family tension, and guilt when you need a break. You need clarity on what’s done and what’s next, and help drafting the boring bits so you’re not alone with the inbox.",
  },
  {
    title: "You’re ‘fine’ at work while grief runs your mornings, your sleep, and your inbox.",
    body: "Nobody sees the cost of holding it together. You need short, honest lessons that fit before a shift, and admin that doesn’t ask you to be brave on the phone at 9am.",
  },
  {
    title: "You’re done with ‘time heals.’ You want language for what your body’s doing.",
    body: "You’re not dramatic; you’re human. You want research-backed explanations, practical skills for hard hours, and zero shame for needing both heart and logistics in one place.",
  },
];

export const faqItems: FaqItem[] = [
  {
    q: "What is gently?",
    a: "gently is one platform that combines estate support, admin help, and grief wellbeing guidance after loss.",
  },
  {
    q: "How does it help me day to day?",
    a: "It helps you organise estate and admin tasks, shows what to do next, and gives practical grief support in one place.",
  },
  {
    q: "Is this legal advice or therapy?",
    a: "No. gently is a support platform, not legal advice and not therapy. It is designed to work alongside professionals.",
  },
];


export const solutionsDropdown: NavDropdownItem[] = [
  {
    title: "Care Team overview",
    desc: "Estate, admin, and grief support in one calm place",
    href: "#solution",
  },
  {
    title: "🏠 Estate & legacy",
    desc: "Probate, the home, and closing the estate, with guidance in plain English",
    href: "#pillar-estate",
    color: "var(--accent)",
  },
  {
    title: "⚡ Admin & logistics",
    desc: "Funerals, benefits, accounts, and the jobs that pile up on day one",
    href: "#pillar-admin",
    color: "var(--blue)",
  },
  {
    title: "🌱 Grief & wellbeing",
    desc: "Courses, tools, and help connecting with professional support",
    href: "#pillar-wellbeing",
    color: "var(--green)",
  },
];

export const resourcesDropdown: NavDropdownItem[] = [
  { title: "About gently", href: "#bereavement-intro" },
  { title: "Science & research", href: "#science" },
  { title: "Who it's for", href: "#who" },
  { title: "FAQ", href: "#faq" },
  { title: "What people say", href: "#testimonials" },
];

/** Floating chat — email + message lead capture */
export const chatWidget: ChatWidgetContent = {
  launcherLabel: "Ask a question",
  agentName: "gently",
  individual: {
    headerSubtext: "Our team can also help",
    welcomeMessages: [
      "Hi there! You're speaking with the gently team. We're here to answer questions about support after loss — for you or someone you're caring for.",
      "How can we help?",
    ],
  },
  business: {
    headerSubtext: "Partnerships & employer support",
    welcomeMessages: [
      "Hi there! You're speaking with the gently partnerships team. We work with HR and benefits leaders to offer bereavement support that's free for employees — estate, admin, and grief wellbeing in one place.",
      "What would you like to explore — roll-out, pricing, or how gently fits your organisation?",
    ],
  },
  emailPlaceholder: "email@example.com",
  messagePlaceholder: "Type your question…",
  sendAriaLabel: "Send message",
  closeAriaLabel: "Close chat",
  timestampJustNow: "Just now",
  invalidEmail: "Please enter a valid email address.",
  emptyMessage: "Please add a short message so we know how to help.",
  sendingLabel: "Sending…",
  thankYouMessage:
    "Thank you — we've received your message. Someone from the team will reply by email shortly.",
  errorMessage: "We couldn't send that. Please try again in a moment.",
  networkError: "Something went wrong. Check your connection and try again.",
};

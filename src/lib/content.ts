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
} from "@/types";

/** Primary intro call — Calendly 30 min */
export const bookingUrl = "https://calendly.com/jeremy-grievegently/30min";

/** Spread onto `<a href={bookingUrl} {...openExternalTab}>` for external booking links */
export const openExternalTab = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

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
    "Don’t have a password yet? Use the button below — it opens the early access form in a new tab so you can join the waitlist.",
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

/** Primary hero button — opens booking (Calendly) */
export const heroBookingCta = "Book a Demo";

export const bereavementIntro = {
  headline: "A modern approach to bereavement support",
  brand: "gently.",
  body: "is a new kind of bereavement support. Modern, professional, and grounded in personalised care. We’re by your side — every step of the way. We handle the admin, so you can handle your heart.",
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
    line1: "Care for your people—head and heart.",
    line2: "Support your institution can stand behind.",
    donePanelTitle: "Now you can focus on healing",
    donePanelBody:
      "The paperwork is handled. The calls are made. The plan is in place. Focus now on being human and healing.",
  },
};

/** Pain section — Reddit-style social proof card */
export const painRedditCard = {
  metaLine: "u/anonymous · r/GriefSupport",
  quote:
    "Nobody told me grief would feel this physical. I just lie there at 3am waiting for morning.",
} as const;

export const navBusinessCta = {
  body: "Extend support when it is needed most",
  linkLabel: "Request a demo →",
} as const;

export const ctaSection: {
  individual: CtaSectionVariant;
  business: CtaSectionVariant;
} = {
  individual: {
    headlineBeforeBreak: "Ready for relief",
    headlineQuestion: "after loss?",
    subhead:
      "More room for what matters—tenderness, rest, memory—while gently handles the practical: clearer steps, less paperwork, fewer surprises.",
    primaryCta: "Request a demo",
    secondaryCta: "See how it works",
    secondaryHref: "#solution",
  },
  business: {
    headlineBeforeBreak: "Better bereavement support",
    headlineQuestion: "for your people?",
    subhead:
      "Warm, dependable guidance when life gets heavy—so teams aren’t left juggling grief, logistics, and loneliness alone.",
    primaryCta: "Request a demo",
    secondaryCta: "View solutions",
    secondaryHref: "#solution",
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
      "Estate, admin, and grief land together — yet most people are left to stitch it all together on their own.",
    items: [
      {
        title: "Everything lives in different places",
        body: "Spreadsheets, solicitor emails, bank portals, and late-night searches — nothing talks to anything else.",
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
    headline: "Bereavement shows up as presenteeism, absence, and quiet exits.",
    subhead:
      "Most organisations still stop at a few days' leave and an EAP leaflet — while estate and grief load carry on in the background.",
    items: [
      {
        title: "The load is often invisible",
        body: "High performers return looking fine while still drowning in probate, accounts, and sleepless nights.",
      },
      {
        title: "Point solutions miss the whole picture",
        body: "Legal tools rarely touch emotional recovery; wellbeing apps rarely touch the estate. Families need both.",
      },
      {
        title: "Trust erodes when support stops early",
        body: "When people feel abandoned after loss, loyalty and psychological safety at work can quietly fracture.",
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
      "Thoughtful help choosing a funeral director that fits where you live, what you believe, and what your family needs—without cold calls when your head is already full.",
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
      "Cancelling subscriptions, closing accounts, and stopping the small recurring jobs that pile up—we lift that off your plate so you can breathe.",
  },
  {
    id: "grief",
    title: "Getting grief support",
    pillarAnchor: "wellbeing",
    body:
      "Gentle resources for hard days—short, honest, and free of jargon. Inside gently you’ll find expert-written wellbeing courses you can start, pause, and come back to: built for real life, not perfect days.",
    bodySecondary:
      "When you need someone beside the screen, we help connect you with professional bereavement and counselling support—people who do this work every day—matched to what you need so you’re not guessing who to call or carrying it all alone.",
    bullets: [
      "16 self-guided courses from grief and wellness specialists",
      "94 bite-sized lessons with practical skills you can actually use",
      "Topics that meet you where you are—sleep, your body, memory, and the wobbly days",
      "53 science-informed tools for real moments—before work, after midnight, whenever you need them",
    ],
  },
  {
    id: "house",
    title: "Dealing with the house",
    body:
      "Clearer steps for the home: bills, upkeep, and decisions that can’t wait—so you’re not guessing alone with a key in your hand.",
  },
  {
    id: "probate",
    title: "Navigating probate",
    body:
      "Guidance through probate and closing the estate in words you can follow—at a pace you can hold, alongside professionals when you need them.",
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
      "Practical help for the jobs nobody rehearses for—funerals, forms, the house, probate, and the days that feel too loud or too quiet. One calm place to turn.",
    accordions: solutionCareAccordions,
  },
  business: {
    kicker: "The solution",
    headline: "An entire Care Team for each person you support.",
    subhead:
      "Give every colleague, member, or client facing loss a dedicated team—estate clarity, admin lifted, and gentle wellbeing alongside. So your institution shows competence and care when hearts need it most.",
    accordions: solutionCareAccordions,
  },
};

export const testimonialsSection: TestimonialsSectionContent = {
  headline: "Kind words from people who get it.",
  subhead: "Little messages from forums, circles, and early friends of gently — warm, rough, real.",
};

export const testimonials: Testimonial[] = [
  {
    user: "Moira L.",
    source: "Peer group · Yorkshire",
    quote:
      "Didn’t think an app could feel gentle. The 3am bit about your body — I cried in the car, then breathed. I needed that.",
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
      "Mapped the estate in one go. Walked away lighter — like someone laid the mess out without judging.",
  },
  {
    user: "Rob M.",
    source: "Men’s circle · London",
    quote:
      "Rubbish at feelings talk. The science bits felt safe — no drama, just truth. That helped.",
  },
  {
    user: "Amina K.",
    source: "Forum thread",
    quote:
      "Probate was eating my evenings. Drafts and a clear next step — I slept again. Thank you.",
  },
  {
    user: "The Okonkwo family",
    source: "Young loss meet-up",
    quote:
      "We’re messy and tired together. One place for tears and forms — we didn’t have that before.",
  },
];

export const scienceSection: ScienceSectionContent = {
  kicker: "The research",
  headline: "Evidence-led care—not guesswork.",
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
        "Grief does not require prolonged impairment. Most bereaved individuals show resilience — stable function alongside periods of difficulty.",
    },
    {
      name: "Kristin Neff",
      role: "Self-compassion researcher · UT Austin",
      quote:
        "People who treat themselves with care process grief more effectively. Self-compassion is one of the most evidence-supported predictors of healthy grief adjustment.",
    },
  ],
};

export const b2bSolutions: B2BSolution[] = [
  {
    icon: "🏢",
    title: "For Employers",
    desc: "Help employees bring their whole selves back to work. Full estate, admin and grief support as an employee benefit — reducing absence and increasing trust.",
    href: bookingUrl,
    anchorId: "b2b-employers",
  },
  {
    icon: "💼",
    title: "For Consultants",
    desc: "Proven solutions to meet your clients' needs. White-label the full platform or integrate individual pillars into your existing offering.",
    href: bookingUrl,
    anchorId: "b2b-consultants",
  },
  {
    icon: "🏦",
    title: "For Financial Institutions",
    desc: "Deepen client trust through full-circle support. Estate and legacy planning integrated into your client journey — from planning through bereavement.",
    href: bookingUrl,
    anchorId: "b2b-financial",
  },
  {
    icon: "🏥",
    title: "For Health Plans",
    desc: "Give your members the care they deserve. Grief wellbeing courses as a member benefit — evidence-based, expert-designed, measurably effective.",
    href: bookingUrl,
    anchorId: "b2b-health-plans",
  },
];

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
    heading: "Business",
    links: [
      { label: "Overview", href: "#b2b", switchAudience: "business" },
      { label: "For employers", href: "#b2b-employers", switchAudience: "business" },
      { label: "For consultants", href: "#b2b-consultants", switchAudience: "business" },
      { label: "Financial institutions", href: "#b2b-financial", switchAudience: "business" },
      { label: "Health plans", href: "#b2b-health-plans", switchAudience: "business" },
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
    kicker: "Who it's for",
    headlineSuffix: "is for your people.",
  },
};

export const whoCards: WhoCard[] = [
  {
    title: "You didn’t get a roadmap — you got probate, panic, and paperwork in the same season.",
    body: "The estate hits while you’re still reeling. You shouldn’t need three apps, a solicitor, and a spreadsheet just to know what you own, what’s owed, and what has to happen next. One place for the whole tangle.",
  },
  {
    title: "You said yes to being executor, and inherited a job nobody trained you for.",
    body: "Forms, deadlines, family tension, and guilt when you need a break. You need clarity on what’s done and what’s next — and help drafting the boring bits so you’re not alone with the inbox.",
  },
  {
    title: "You’re ‘fine’ at work while grief runs your mornings, your sleep, and your inbox.",
    body: "Nobody sees the cost of holding it together. You need short, honest lessons that fit before a shift — and admin that doesn’t ask you to be brave on the phone at 9am.",
  },
  {
    title: "You’re done with ‘time heals’ — you want language for what your body’s doing.",
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

export const businessDropdown: NavDropdownItem[] = [
  {
    title: "For Employers",
    desc: "Help employees bring their whole selves back to work",
    href: "#b2b-employers",
    switchAudience: "business",
  },
  {
    title: "For Consultants",
    desc: "Proven solutions to meet your clients' needs",
    href: "#b2b-consultants",
    switchAudience: "business",
  },
  {
    title: "For Financial Institutions",
    desc: "Deepen client trust through full-circle support",
    href: "#b2b-financial",
    switchAudience: "business",
  },
  {
    title: "For Health Plans",
    desc: "Give your members the care they deserve",
    href: "#b2b-health-plans",
    switchAudience: "business",
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
    desc: "Probate, the home, and closing the estate—with guidance in plain English",
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

import type {
  PillarData,
  Testimonial,
  B2BSolution,
  WhoCard,
  FaqItem,
  NavDropdownItem,
  ProblemSectionContent,
  WhoSectionContent,
  TestimonialsSectionContent,
  GatePageContent,
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

export const navBusinessCta = {
  body: "Extend support when it is needed most",
  linkLabel: "Request a demo →",
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

export const pillars: PillarData[] = [
  {
    id: "estate",
    icon: "🏠",
    num: "01",
    name: "Estate & Legacy",
    desc: "Total clarity on what you own, what's owed, and what happens next.",
    accentVar: "--accent",
    headline: "Total clarity on what you own and what's next.",
    lede:
      "AI maps your full estate automatically — assets, debts, documents — and flags issues before they become costly.",
    features: [
      "AI visualises assets, debts and documents automatically",
      "Flags potential issues before they become costly problems",
      "Secure vault for wills, insurance policies and key files",
      "Probate, legal and financial guidance in plain English",
    ],
    impactNum: "< 30 min",
    impactLabel: "to map your full estate\nwith AI visualisations",
  },
  {
    id: "admin",
    icon: "⚡",
    num: "02",
    name: "Streamlined Admin",
    desc: "Let the AI handle the heavy lifting — no chasing, no delays.",
    accentVar: "--blue",
    headline: "AI acts on your behalf across every task.",
    lede:
      "The AI Concierge handles the bureaucracy — so you don't have to chase, repeat yourself, or manage paperwork under grief.",
    features: [
      "AI Concierge acts on your behalf across every task",
      "Personalised action roadmap — always know what's next",
      "Probate, legal and financial guidance in plain English",
      "Benefits claims, account closures, notifications handled",
    ],
    impactNum: "400+ hrs",
    impactLabel: "saved per family over\n18 months on average",
  },
  {
    id: "wellbeing",
    icon: "🌱",
    num: "03",
    name: "Wellbeing Courses",
    desc: "Expert-guided support for every stage, at your pace.",
    accentVar: "--green",
    headline: "Expert-guided support at your pace.",
    lede:
      "16 self-guided courses built by grief and wellness experts — 94 bite-size lessons with practical, real-life skills.",
    features: [
      "16 self-guided courses built by grief and wellness experts",
      "94 bite-size lessons with practical, real-life skills",
      "Covers physical health, emotional recovery and memory work",
      "53 science-backed skills usable in real grief moments",
    ],
    impactNum: "16 courses",
    impactLabel: "across grief, health &\nlegacy support",
  },
];

export const testimonialsSection: TestimonialsSectionContent = {
  headline: "What people told us — in their own words.",
  subhead:
    "Bereavement groups, Reddit threads, and our earliest testers. These aren’t ad testimonials; they’re the kind of thing someone says when the kettle’s boiled and the room’s gone quiet.",
};

export const testimonials: Testimonial[] = [
  {
    user: "Karen",
    source: "In-person widowed group · Yorkshire (shared with permission)",
    quote:
      "I went in cynical about ‘apps for feelings.’ Then the bit on 3am — why your body does that — I sat in my car afterwards and just breathed. It’s not magic. It’s the first thing that didn’t make me feel broken.",
  },
  {
    user: "holdingittogether_42",
    source: "r/Grief",
    quote:
      "I’ve been ‘fine’ at work since my mum died. Air-quote fine. Reading other people describe the exact same pretending cost me something. This is the only place that names that version of grief without making it a performance.",
  },
  {
    user: "S.",
    source: "Alpha tester · estate mapping (anonymised)",
    quote:
      "Twenty-something minutes to map what I’d been dreading for months. I pulled over after because I couldn’t see the road. Not sad — relieved. Like someone finally laid the mess out on a table so I could see it.",
  },
  {
    user: "Dave",
    source: "Men’s bereavement drop-in · London",
    quote:
      "I’m not a ‘talk about emotions’ person. The science framing gave me permission to look at it without feeling like I was dramatising. I get what my nervous system is doing now. That alone made the last month easier.",
  },
  {
    user: "executor_throwaway",
    source: "r/UKPersonalFinance (post about probate overwhelm)",
    quote:
      "Everyone jokes about ‘death admin’ until you’re the one with the folders. Having something draft letters and remember what comes next — I stopped waking up with a punch list in my head. That’s not a small thing.",
  },
  {
    user: "A. & L.",
    source: "In-person young widowed group · London (early testers)",
    quote:
      "We’re not the Instagram version of loss. We’re tired, we’re snappy with each other sometimes, and we still have to book the plumber. A tool that gets both the practical and the 2am stuff — we’ve been waiting for that.",
  },
];

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
export const navCustomersHref = "#testimonials";
export const navLoginHref = "#cta";

export const whoSection: WhoSectionContent = {
  kicker: "Who it's for",
  headlineSuffix: "is for.",
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
    q: "What are the three pillars?",
    a: "gently brings together three integrated products: Estate & Legacy (AI maps your assets, debts, and documents and handles probate), Streamlined Admin (AI Concierge acts on your behalf for HMRC, pension claims, account closures, and more), and Wellbeing Courses (16 expert-guided grief and recovery courses, 94 lessons, 53 science-backed skills).",
  },
  {
    q: "How long does the estate mapping take?",
    a: "Under 30 minutes for a complete initial map. The AI automatically organises assets, liabilities, and documents and flags any issues or missing items.",
  },
  {
    q: "Is the grief curriculum actually evidence-based?",
    a: "Yes. Every lesson cites real published research — author, title, year, URL — including O'Connor, Bonanno, Neff, Walker, and van der Kolk. The science is the foundation, not decoration.",
  },
  {
    q: "How long are the wellbeing lessons?",
    a: "Each lesson is approximately 15 minutes. Designed for real moments — before work, during a break, at night. You need 15 minutes, not a clear hour.",
  },
  {
    q: "Is this for individuals or businesses?",
    a: "Both. Individuals access the full platform directly. Businesses can license the platform as a benefit or white-label solution. Use the toggle at the top of the page to switch views.",
  },
  {
    q: "Is this a substitute for legal or therapy services?",
    a: "No. gently is a support platform — not legal advice, not therapy. We work alongside professionals. The wellbeing courses are self-directed, not clinical treatment.",
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
    title: "🏠 Estate & Legacy",
    desc: "Total clarity on what you own, what's owed, and what happens next",
    href: "#pillar-estate",
    color: "var(--accent)",
  },
  {
    title: "⚡ Streamlined Admin",
    desc: "AI handles the heavy lifting — no chasing, no delays",
    href: "#pillar-admin",
    color: "var(--blue)",
  },
  {
    title: "🌱 Wellbeing Courses",
    desc: "16 expert-guided courses for grief, health and recovery",
    href: "#pillar-wellbeing",
    color: "var(--green)",
  },
];

export const resourcesDropdown: NavDropdownItem[] = [
  { title: "Blog", href: "#who" },
  { title: "Research", href: "#science" },
  { title: "FAQ", href: "#faq" },
  { title: "Press", href: "#testimonials" },
];

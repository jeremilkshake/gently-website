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
  CompareScrollAudienceContent,
  FooterColumn,
  ScienceSectionContent,
  BusinessStatStripContent,
  BusinessPartnershipContent,
  BusinessCompareTableContent,
  BusinessPricingModelContent,
  BusinessWhyPartnerContent,
  PartnerLeaderQuoteContent,
  ChatWidgetContent,
  HomeChooserContent,
  MissionPageContent,
  ContactPageContent,
  PartnerPageContent,
  PartnerSlug,
  CustomApproachSectionContent,
} from "@/types";
import { ROUTES, partnerPath, sectionHref } from "@/lib/routes";
import { COMPARE_COLUMNS } from "@/lib/compareScrollSteps";

const compareScrollWithoutSteps = COMPARE_COLUMNS[0].cards.map((card) => ({
  title: card.title,
  body: card.description,
}));

const compareScrollWithSteps = COMPARE_COLUMNS[1].cards
  .filter((card) => !card.isSpacer)
  .map((card) => ({
    num: card.index + 1,
    title: card.title,
    body: card.description,
  }));

/** Primary intro call, Calendly 30 min */
export const bookingUrl = "https://calendly.com/jeremy-grievegently/30min";

/** Spread onto `<a href={bookingUrl} {...openExternalTab}>` for external booking links */
export const openExternalTab = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

/** Top nav, Partners dropdown trigger label */
export const navPartnersMenu = "Partners";

export const navFamiliesLabel = "For You";

export const navCompanyMenu = "Company";

export const navSolutionsMenu = "Solutions";

export const navResourcesMenu = "Resources";

export const navContactLabel = "Contact us";

export const navContactDesc = "Demo requests & partnership inquiries";

export const navMobileMenuOpenAria = "Open menu";

export const navMobileMenuCloseAria = "Close menu";

/** Neutral `/` chooser, individuals vs partners */
export const homeChooser: HomeChooserContent = {
  headline: "Support after loss, done gently.",
  subhead: "Whether you're carrying this yourself or supporting others at scale.",
  intro:
    "No heart should grieve alone. That's what we're here for. Choose how you'd like to use gently.",
  families: {
    label: "For You",
    body: "Not sure where to start after loss? Estate? Probate? Inheritance? The Will? Funeral planning? Finding benefits? Government paperwork? Closing accounts?",
    closing: "That's exactly what we're here for.",
    href: ROUTES.forYou,
  },
  partners: {
    label: "For Partners",
    body: "Not sure how to support your people after a loss? Hospice and hospitals? Education institutions? Employers? Financial institutions? Funeral homes?",
    closing: "Full support for all your people. Become a gently partner.",
    href: ROUTES.partners,
  },
};

/** `/company/mission` */
export const missionPage: MissionPageContent = {
  kicker: "Company",
  headline: "Our mission",
  subhead: "Care that meets people where they are, after loss, without the scramble.",
  paragraphs: [
    "Gently exists because bereavement is never just one thing. Estate, admin, and grief land together, yet most people are left to stitch it alone, or organisations offer a fragment of what families actually need.",
    "We build one calm platform that covers the full journey: practical estate and admin help, and evidence-led grief wellbeing. Free for families when offered through a partner; straightforward for organisations to deploy without a heavy integration.",
    "Our north star is simple: when loss happens, people should have clarity, dignity, and support, not a pile of tabs, cold calls, and guesswork.",
  ],
  ctaLabel: "Partner with gently",
  ctaHref: ROUTES.partners,
};

/** `/company/contact` */
export const contactPage: ContactPageContent = {
  kicker: "Contact / demo request + partnership inquiry",
  headline: "Interested in bringing gently to your organisation?",
  quote: {
    text: "gently is the first platform I've seen that families and employers can actually rely on, long after the funeral.",
    attribution: "HSBC Ex Head of HR",
  },
  form: {
    firstName: { label: "First name", placeholder: "First name" },
    lastName: { label: "Last name", placeholder: "Last name" },
    email: { label: "Business email address", placeholder: "Business email address" },
    phone: { label: "Phone", placeholder: "Phone" },
    country: { label: "Country", placeholder: "Country" },
    company: { label: "Company / institution", placeholder: "Company / institution" },
    title: { label: "Title", placeholder: "Title" },
    message: {
      label: "Message",
      placeholder:
        "Tell us about your organisation. A little context helps us connect you to the right person faster.",
    },
    privacyPrefix: "I agree to the gently",
    privacyLinkLabel: "Privacy Policy",
    privacyHref: sectionHref(ROUTES.forYou, "cta"),
    submitLabel: "Request contact",
    submittingLabel: "Sending…",
    consentRequired: "Please confirm you agree to our privacy policy.",
    invalidEmail: "Please enter a valid business email address.",
    messageRequired: "Please add a short message so we know how to help.",
    successTitle: "Thank you",
    successBody:
      "We've received your message. Someone from the gently team will be in touch shortly.",
    errorMessage: "We couldn't send that. Please try again in a moment.",
    networkError: "Something went wrong. Check your connection and try again.",
  },
};

/** Full-screen access layer on the marketing home when the gate is enabled */
export const marketingAccessGate = {
  lead: "You’re on the main site. Enter the access code below to unlock the full page.",
  misconfigured:
    "Gate is not configured. Set GATE_JWT_SECRET and SITE_ACCESS_PASSWORD on the server.",
} as const;

/** Stealth gate UI, legacy /gate route (redirects to home) */
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

/** After logout, returns to the yellow Early Access landing (Early Access + Info) */
export const gateLogoutHref = ROUTES.home;

/** Hero visual asset */
export const heroVisual = {
  src: "/images/hero-support-collage.svg",
  alt: "Platform preview showing estate overview, guided support, and admin task progress.",
} as const;

export const heroBadgeText = "Made with care for people carrying something heavy.";

/** Business hero, inline trust pills under the CTAs (icon + short label). */
export const heroBusinessTrustBadges = [
  { icon: "heart", label: "Free for your people" },
  { icon: "shield", label: "Secure & Private" },
] as const;

/** Primary hero button on For You, opens booking (Calendly) */
export const heroBookingCta = "Get Support Now";

/** Nav booking button on partner / hub routes */
export const navBookingCta = "Book a Demo";

/** Primary hero button on the business tab, opens booking (Calendly) */
export const heroBusinessBookingCta = "Become a Partner";

/** Business hero, lede under the headline */
export const heroBusinessLede =
  "Gently helps standardise bereavement support across your organisation. Families get one secure pathway for estate, admin, and grief wellbeing, completely free for them. When loss happens, they have everything in one place.";

/** For You page hero (`/for-you`) */
export const heroIndividual = {
  headlineBefore: "Everything that comes after loss, ",
  headlineEmphasis: "handled.",
  lede:
    "Gently guides you through every step of the process. Get the clarity and confidence of professional support, with fees settled from the estate when funds are available, not charged to you upfront.",
  primaryCta: heroBookingCta,
  secondaryCta: "See how it works",
  secondaryHref: sectionHref(ROUTES.forYou, "solution"),
} as const;

/** For All Partners (`/partners`) hero, same layout as For You */
export const heroPartnersHub = {
  headlineSegments: [
    { text: "Give your people the " },
    { text: "gift", highlight: true },
    { text: " of " },
    { text: "complete support", highlight: true },
    { text: " after loss." },
  ],
  lede:
    "Gently helps standardise bereavement support across your organisation. Families get one secure pathway for estate, admin, and grief wellbeing, completely free for them. When loss happens, they have everything in one place.",
  primaryCta: heroBusinessBookingCta,
  secondaryCta: "Explore partner types",
  secondaryHref: sectionHref(ROUTES.partners, "b2b"),
  forYouPrompt: "Looking for support after a loss?",
  forYouLinkLabel: "Go to For You",
  forYouHref: ROUTES.forYou,
} as const;

export const bereavementIntro = {
  headline: "A modern approach to bereavement support",
  brand: "gently.",
  body: "is a new kind of bereavement support. Modern, professional, and grounded in personalised care. We’re by your side, every step of the way. We handle the admin, so you can handle your heart.",
} as const;

/** For You — vertical care journey timeline (`#custom-approach`) */
export const customApproachSection: CustomApproachSectionContent = {
  kicker: "How it works",
  headline: "A custom approach to care",
  appDownloadLabel: "Download the gently grief support app",
  appDownloadHref: sectionHref(ROUTES.forYou, "cta"),
  steps: [
    {
      num: 1,
      title: "Match with a Gently Care Manager",
    },
    {
      num: 2,
      title: "Get a step-by-step Plan",
    },
    {
      num: 3,
      title: "Handle logistics",
      body: "Our custom Care Plans are designed to meet each family’s unique needs, with personalised guidance to get through even the hardest tasks.",
      bodySecondary:
        "Whether it’s finding a funeral home, closing your loved one’s accounts, or navigating probate, our time-saving tools will do the work for you.",
    },
    {
      num: 4,
      title: "Tend to emotional needs",
      body: "Through daily journaling, guided meditations, and breathing exercises, our compassionate approach helps cope with the many faces of grief.",
    },
    {
      num: 5,
      title: "Access ongoing support",
      body: "Our extensive library hosts in-depth articles and audio guides that cover the full spectrum of loss, from funeral planning and taxes to managing family dynamics.",
    },
    {
      num: 6,
      title: "Join the gently Community",
      body: "Grief can feel isolating, but you’re not alone. Interact with others in the Community to find comfort, support, and sense of belonging that come from shared experiences.",
      footnote: {
        beforeLink: "Join us for gently grief retreat 2027. ",
        linkLabel: "Sign up here",
        href: bookingUrl,
      },
    },
  ],
};

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

const compareScrollSharedLabels = {
  kicker: "The difference",
  beforeAfterEmphasis: "gently.",
  withoutTitle: "Without Gently",
  withTitle: "With Gently",
  withoutDoneBadge: "Finally Done",
  withoutHoursUnit: "hrs",
  withSavePrefix: "Save",
  withHoursUnit: "hrs",
  withDoneBadge: "⚡ Done",
  mobileWithoutTab: "Without gently",
  mobileWithTab: "With gently",
} as const;

export const compareScrollSection: {
  individual: CompareScrollAudienceContent;
  business: CompareScrollAudienceContent;
} = {
  individual: {
    line1: "Personalise your grief support.",
    line2: "Reclaim your time.",
    donePanelTitle: "Now you can focus on healing",
    donePanelBody:
      "The paperwork is handled. The calls are made. The plan is in place. Focus now on being human and healing.",
    labels: { ...compareScrollSharedLabels },
    withoutSteps: compareScrollWithoutSteps,
    withSteps: compareScrollWithSteps,
    maxWithoutHours: 14,
    maxSavedHours: 3,
  },
  business: {
    line1: "Complete coverage. Measurable impact.",
    line2: "One platform. Estate, admin, wellbeing.",
    donePanelTitle: "Your people return ready, not wrecked",
    donePanelBody:
      "The estate is handled. The admin is closed out. Grief support is in place. Your employees come back to work with capacity, not chaos.",
    labels: { ...compareScrollSharedLabels },
    withoutSteps: compareScrollWithoutSteps,
    withSteps: compareScrollWithSteps,
    maxWithoutHours: 14,
    maxSavedHours: 3,
  },
};

/** @deprecated Use compareScrollSection — kept for any legacy imports */
export const compareSupportCopy: {
  individual: CompareSupportCopyVariant;
  business: CompareSupportCopyVariant;
} = {
  individual: compareScrollSection.individual,
  business: compareScrollSection.business,
};

/** Pain section, Reddit-style social proof card */
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
    secondaryHref: ROUTES.partners,
  },
} as const;

export const problemSection: {
  individual: ProblemSectionContent;
  business: ProblemSectionContent;
} = {
  individual: {
    familiar: {
      eyebrow: "Does any of this feel familiar?",
      narrative: {
        prefix: "You have to grieve — whilst also managing your loved one's",
      },
      panelSubtitle: "After a loss",
      panelStatus: "We're here to help",
      panelGroups: [
        {
          label: "Where to begin",
          points: ["Not sure where to start", "What to do", "How to do it"],
          imageSrc: "/images/estate-visualisation.png",
          imageAlt: "Estate split across uncertain pieces",
        },
        {
          label: "The paperwork",
          points: ["Where paperwork is", "What to fill in", "When to fill it in"],
          imageSrc: "/images/document-organisation-folder.png",
          imageAlt: "Documents and forms to organise",
        },
        {
          label: "While you grieve",
          points: ["All whilst trying to grieve"],
          imageSrc: "/images/guided-care-plan.png",
          imageAlt: "Steps and deadlines on a long timeline",
        },
      ],
      topics: [
        {
          id: "estate",
          title: "Estate",
          slotLabel: "estate",
          body: "Property, assets, and who handles what rarely come with a clear map, especially when you are grieving.",
          imageSrc: "/images/problem-topic-estate.png",
          imageAlt: "Estate split into pieces with no clear map",
        },
        {
          id: "probate",
          title: "Probate",
          slotLabel: "probate",
          body: "Forms, thresholds, and legal steps that are hard to parse when all you want is a straight answer.",
          imageSrc: "/images/problem-topic-probate.png",
          imageAlt: "Probate forms and legal steps that feel unclear",
        },
        {
          id: "inheritance",
          title: "Inheritance",
          slotLabel: "inheritance",
          body: "Who receives what, and when, often stays unclear until you are already deep in admin.",
          imageSrc: "/images/problem-topic-inheritance.png",
          imageAlt: "Inheritance with uncertain who gets what and when",
        },
        {
          id: "will",
          title: "The will",
          slotLabel: "will",
          body: "Finding it, reading it, and knowing what it means in practice, often without a solicitor on speed dial.",
          imageSrc: "/images/problem-topic-will.png",
          imageAlt: "A will that is hard to find and understand",
        },
        {
          id: "funeral",
          title: "Funeral planning",
          slotLabel: "funeral",
          body: "Decisions that feel urgent and emotional, with prices and choices that are hard to compare calmly.",
          imageSrc: "/images/problem-topic-funeral.png",
          imageAlt: "Funeral choices and costs that are hard to compare",
        },
        {
          id: "benefits",
          title: "Benefits",
          slotLabel: "benefits",
          body: "Entitlements you may not know exist, buried in government sites and letters that arrive too late.",
          imageSrc: "/images/problem-topic-benefits.png",
          imageAlt: "Benefits and entitlements that are easy to miss",
        },
        {
          id: "government",
          title: "Government paperwork",
          slotLabel: "paperwork",
          body: "Registers, notifications, and departments that do not talk to each other, while deadlines keep moving.",
          imageSrc: "/images/problem-topic-government.png",
          imageAlt: "Government departments and deadlines that do not align",
        },
        {
          id: "accounts",
          title: "Closing accounts",
          slotLabel: "accounts",
          body: "Banks, utilities, and subscriptions. Each with its own process, proof, and hold music.",
          imageSrc: "/images/problem-topic-accounts.png",
          imageAlt: "Many accounts each with a different closing process",
        },
      ],
      accordionClipAfterId: "will",
      topicIntervalMs: 5000,
      reassurance: "That's exactly what we're here for.",
    },
    tag: "The problem",
    items: [
      {
        title: "Everything lives in different places",
        body: "Spreadsheets, solicitor emails, bank portals, and late-night searches, and nothing talks to anything else.",
        icon: "layers",
      },
      {
        title: "The admin doesn't pause for grief",
        body: "Notifications, deadlines, and paperwork keep coming when your mind is somewhere else entirely.",
        icon: "clock",
      },
      {
        title: "You're told to cope, not equipped to",
        body: "Platitudes don't explain 3am wakeups or form fatigue. You need clarity and practical support, not silence.",
        icon: "heart",
      },
    ],
  },
  business: {
    tag: "The problem",
    headline: "Bereavement support is fragmented, for organisations and families alike.",
    subhead:
      "Most programmes stop at a few days of leave or a single vendor. The estate, admin, and emotional load run for 12–18 months. Families and your teams are left filling the gaps.",
    items: [
      {
        title: "Fragmented support stack",
        body: "Legal benefits don’t touch grief. Wellbeing apps don’t touch probate. People end up coordinating their own care during the worst weeks of their lives.",
        icon: "layers",
      },
      {
        title: "Invisible strain on people",
        body: "Grieving employees, patients’ families, or members return to daily life while the practical and emotional load continues, often without a single place to turn.",
        icon: "users",
      },
      {
        title: "Trust erodes quietly",
        body: "When organisations can’t meet people after loss, loyalty and confidence suffer. The story is rarely named as bereavement, but the timing is.",
        icon: "heart",
      },
    ],
  },
};

export const partnerSlugs: PartnerSlug[] = [
  "hospice-hospitals",
  "education-institutions",
  "employers",
  "financial-institutions",
  "funeral-homes",
  "consultants",
];

export const partnerPages: Record<PartnerSlug, PartnerPageContent> = {
  "hospice-hospitals": {
    slug: "hospice-hospitals",
    hero: {
      kicker: "For hospice & hospitals",
      headline: "Extend dignified bereavement care beyond the bedside.",
      lede: "Give families one calm pathway for estate, admin, and grief support, while clinical teams stay focused on care.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("hospice-hospitals"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Families leave clinical care into a maze of admin.",
      subhead:
        "Discharge folders and sympathy cards don’t cover probate, accounts, or grief. Teams want to help, but the long tail falls outside the ward.",
      items: [
        {
          title: "Care ends, complexity doesn’t",
          body: "Families face funerals, benefits, and estate tasks without a guide, often while your staff field ad hoc questions they can’t fully answer.",
        },
        {
          title: "Referral paths are fragmented",
          body: "Chaplains, social workers, and bereavement teams patch together leaflets and helplines. Nothing connects estate, admin, and wellbeing in one place.",
        },
        {
          title: "Reputation follows the whole journey",
          body: "How families feel months after loss shapes trust in your organisation. Gaps in practical support can overshadow excellent clinical care.",
        },
      ],
    },
  },
  employers: {
    slug: "employers",
    hero: {
      kicker: "For employers",
      headline: "Give your people complete support after loss.",
      lede: "Estate, admin, and grief wellbeing as a benefit, free for employees, straightforward for HR to deploy.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("employers"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Most bereavement benefits stop too soon.",
      subhead:
        "A few days of leave and an EAP link don’t cover 12–18 months of estate, admin, and grief. The gap shows up in absence, performance, and retention.",
      items: [
        {
          title: "Leave ends, the load doesn’t",
          body: "Employees return while probate, accounts, and grief still demand attention, often without a single trusted resource from work.",
        },
        {
          title: "Fragmented vendor stack",
          body: "Legal, EAP, and insurance benefits rarely connect. HR becomes the coordinator when people are least able to advocate for themselves.",
        },
        {
          title: "Trust and retention risk",
          body: "When people feel abandoned after loss, engagement suffers. Exit interviews rarely name bereavement, but the timing often does.",
        },
      ],
    },
  },
  consultants: {
    slug: "consultants",
    hero: {
      kicker: "For consultants",
      headline: "Differentiate with the only complete bereavement platform.",
      lede: "White-label or integrate estate, admin, and grief wellbeing to win retention with a product clients can’t patch together elsewhere.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("consultants"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Clients ask for bereavement support you can’t fully deliver today.",
      subhead:
        "Point solutions cover one slice: probate, EAP, or grief apps. Your clients need a single, credible answer across the full journey.",
      items: [
        {
          title: "Partial answers lose deals",
          body: "Referring families to disconnected vendors weakens your role as trusted advisor and opens the door to competitors with a fuller story.",
        },
        {
          title: "Implementation fear",
          body: "Clients assume bereavement platforms mean heavy IT. They need proof of fast rollout and low lift, or they won’t sign.",
        },
        {
          title: "Brand matters",
          body: "Whether white-label or co-branded, the experience must feel premium and calm, matching the standard you set in every other benefit.",
        },
      ],
    },
  },
  "financial-institutions": {
    slug: "financial-institutions",
    hero: {
      kicker: "For financial institutions",
      headline: "Deepen client trust through the full estate journey.",
      lede: "From planning through bereavement: one secure platform for legacy, admin, and family support under your brand.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("financial-institutions"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Planning relationships fray when families are left alone after loss.",
      subhead:
        "Advisors build trust over years. Then bereavement scatters families across solicitors, insurers, and guesswork. The institution that stays present wins loyalty.",
      items: [
        {
          title: "The long tail is unmanaged",
          body: "Probate, property, and account closure run for months. Without guided support, families feel your firm disappeared when it mattered most.",
        },
        {
          title: "Compliance and care must align",
          body: "You need secure document handling and clear boundaries, not informal advice over email. Families need structure, not more confusion.",
        },
        {
          title: "Referral networks fragment",
          body: "Solicitors, planners, and internal teams each hold a piece. Nobody owns the family’s single calm pathway through estate and admin.",
        },
      ],
    },
  },
  "funeral-homes": {
    slug: "funeral-homes",
    hero: {
      kicker: "For funeral homes",
      headline: "Support families well beyond the service.",
      lede: "Give every family you serve one calm platform for estate, admin, and grief support, free for them and straightforward for your team to offer.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("funeral-homes"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Families still face the long tail alone after the ceremony.",
      subhead:
        "You deliver dignity on the day. Then probate, accounts, benefits, and grief run for months, often without a single trusted guide families can return to.",
      items: [
        {
          title: "Care stops at the chapel door",
          body: "Families leave with paperwork piles and no clear next steps. Staff want to help further, but estate and admin fall outside what most directors can sustainably cover.",
        },
        {
          title: "Referrals don’t connect",
          body: "Solicitors, insurers, and helplines each hold a piece. Nothing joins estate, admin, and wellbeing in one calm place families already trust.",
        },
        {
          title: "Reputation follows the whole journey",
          body: "How families feel months after the service shapes word of mouth. Practical support after the funeral can deepen loyalty as much as the day itself.",
        },
      ],
    },
  },
  "education-institutions": {
    slug: "education-institutions",
    hero: {
      kicker: "For education institutions",
      headline: "Support students and staff through loss, without overloading campus services.",
      lede: "One calm pathway for estate, admin, and grief wellbeing — free for your community, straightforward for student services and HR to offer.",
      primaryCta: heroBusinessBookingCta,
      secondaryCta: "See how it works",
      secondaryHref: sectionHref(partnerPath("education-institutions"), "solution"),
    },
    problem: {
      tag: "The problem",
      headline: "Campus bereavement support rarely covers what happens after the funeral.",
      subhead:
        "Counselling teams, chaplaincy, and student services do vital work — but probate, benefits, housing, and months of admin fall outside what most education institutions can sustainably provide.",
      items: [
        {
          title: "Students navigate alone",
          body: "International students, first-in-family learners, and young adults often face estate and admin tasks without family nearby or clear guidance from the institution.",
        },
        {
          title: "Staff carry hidden load",
          body: "Faculty and professional services staff return to work while grief and practical tasks still demand attention, with no employer-grade bereavement pathway.",
        },
        {
          title: "Referral paths don’t connect",
          body: "Leaflets, EAP links, and one-off workshops don’t join estate, admin, and wellbeing. Families and students bounce between offices and external vendors.",
        },
      ],
    },
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

/** Shared accordion rows, same journeys; framing is in the section headline/subhead */
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

/** Solution, care team accordion (left headline, right grid) */
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
      "Every employee, member, or client facing loss gets a dedicated team across all three pillars: estate, admin, and wellbeing. One contract. One platform. No technical integration required.",
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
  kicker: navPartnersMenu,
  intro: "Find the right fit for your organisation",
  headline: "Who we partner with",
} as const;

export const b2bSolutions: B2BSolution[] = [
  {
    icon: "🕊️",
    iconSrc: "/images/partner-hospice-hospitals.png?v=3",
    title: "For Hospice and Hospitals",
    dropdownDesc: "Support patients and families through loss with dignity",
    desc: "Extend bereavement care beyond the bedside. Give families one calm place for estate, admin, and grief support, while your teams stay focused on clinical care.",
    slug: "hospice-hospitals",
    href: partnerPath("hospice-hospitals"),
    anchorId: "b2b-hospice-hospitals",
  },
  {
    icon: "🎓",
    iconSrc: "/images/partner-education-institutions.png?v=3",
    title: "For Education Institutions",
    dropdownDesc: "Support students and staff through loss across your institution",
    desc: "Give your community one calm place for estate, admin, and grief wellbeing — free for students and staff, while counselling and student services stay focused on care.",
    slug: "education-institutions",
    href: partnerPath("education-institutions"),
    anchorId: "b2b-education-institutions",
  },
  {
    icon: "🏢",
    iconSrc: "/images/partner-employers.png?v=3",
    title: "For Employers",
    dropdownDesc: "Help employees bring their whole selves back to work",
    desc: "Reduce bereavement-related absence and turnover. Offer complete estate, admin, and grief support as an employee benefit, free for your people, paid by the organisation.",
    slug: "employers",
    href: partnerPath("employers"),
    anchorId: "b2b-employers",
  },
  {
    icon: "🏦",
    iconSrc: "/images/partner-financial-institutions.png?v=3",
    title: "For Financial Institutions",
    dropdownDesc: "Deepen client trust through full-circle support",
    desc: "Deepen client trust through full-circle estate and legacy support. From planning through bereavement, one platform, your brand.",
    slug: "financial-institutions",
    href: partnerPath("financial-institutions"),
    anchorId: "b2b-financial",
  },
  {
    icon: "🕯️",
    iconSrc: "/images/partner-funeral-homes.png?v=3",
    title: "For Funeral Homes",
    dropdownDesc: "Support families beyond the service with dignity",
    desc: "Extend care after the ceremony with one calm platform for estate, admin, and grief support, free for families you serve.",
    slug: "funeral-homes",
    href: partnerPath("funeral-homes"),
    anchorId: "b2b-funeral-homes",
  },
  {
    icon: "💼",
    iconSrc: "/images/partner-consultants.png?v=3",
    title: "For Consultants",
    dropdownDesc: "Proven solutions to meet your clients' needs",
    desc: "White-label the full platform or integrate a single pillar. Win retention and differentiate your offering with the only complete bereavement product on the market.",
    slug: "consultants",
    href: partnerPath("consultants"),
    anchorId: "b2b-consultants",
  },
];

/** Partners nav dropdown, derived from b2bSolutions so labels stay in sync */
export const businessDropdown: NavDropdownItem[] = [
  { title: "For All Partners", desc: "How organisations work with gently", href: ROUTES.partners },
  ...b2bSolutions.map((s) => ({
    title: s.title,
    desc: s.dropdownDesc,
    href: s.href,
  })),
];

export const companyDropdown: NavDropdownItem[] = [
  { title: navContactLabel, desc: navContactDesc, href: ROUTES.contact },
  { title: "Our mission", desc: "Why gently exists", href: ROUTES.mission },
  { title: "About gently", desc: "A modern approach to bereavement support", href: sectionHref(ROUTES.forYou, "bereavement-intro") },
  { title: "FAQ", desc: "Common questions", href: sectionHref(ROUTES.forYou, "faq") },
];

/** Business-only, short stat strip under the partnership intro. */
export const businessStatStrip: BusinessStatStripContent = {
  kicker: "The Gently difference",
  headline: "One platform. Three pillars. Zero integration burden.",
  subhead:
    "Gently is the only platform that covers the full bereavement journey (estate, admin, and grief wellbeing) under a single contract.",
  stats: [
    { value: "1", label: "platform across\nestate, admin & wellbeing" },
    { value: "3", label: "pillars of support\nfor every person you cover" },
    { value: "0", label: "technical integration\nrequired to deploy" },
    { value: "12–18 mo", label: "of support per person,\nnot 3–5 days of leave" },
  ],
};

/** Business-only, "Why partner with us" feature carousel. */
export const businessWhyPartner: BusinessWhyPartnerContent = {
  heading: "A new standard for bereavement support.",
  kicker: "Why partner with us",
  tagline: "The UK's trusted bereavement partner.",
  headline: "Empower families to prepare while they still can.",
  subhead: "Everything your people need, all in one place",
  cards: [
    {
      icon: "lock",
      iconSrc: "/images/secure-digital-vault-heart.png?v=3",
      iconScale: 1.38,
      title: "Secure Digital Vault",
      body: "Families securely store wills, deeds, insurance policies, account information, and personal instructions, all in one encrypted place.",
    },
    {
      icon: "network",
      iconSrc: "/images/estate-visualisation.png?v=3",
      title: "Estate Visualisation",
      body: "An interactive map of the full estate: assets, debts, accounts, and beneficiaries. Everything in one view, so nothing is hidden and nothing forgotten.",
    },
    {
      icon: "folder",
      iconSrc: "/images/document-organisation-folder.png?v=3",
      title: "Document Organisation",
      body: "Upload and categorise every critical document. When the time comes, family members have instant access to everything they need.",
    },
    {
      icon: "share",
      iconSrc: "/images/share-documents.png?v=3",
      title: "Share Documents",
      body: "Securely share specific documents with executors, solicitors, or family members. Granular permissions, a clear audit trail, no email attachments to chase.",
    },
    {
      icon: "checklist",
      iconSrc: "/images/guided-care-plan.png?v=3",
      title: "Guided Care Plan",
      body: "A step-by-step plan that walks patients and families through every task: registering the death, closing accounts, navigating probate, and the long tail after.",
    },
    {
      icon: "handoff",
      iconSrc: "/images/family-handoff.png?v=3",
      title: "Seamless Family Handoff",
      body: "All stored information is pre-filled for the family. They continue on the platform for estate settlement with minimal friction, with no searching, no guessing.",
    },
    {
      icon: "heart",
      iconSrc: "/images/peace-of-mind-heart.png?v=3",
      title: "Peace of Mind",
      body: "Knowing affairs are in order lets families focus on what matters most: time with loved ones, not paperwork.",
    },
    {
      icon: "free",
      iconSrc: "/images/free-for-families.png?v=3",
      title: "100% Free for Families",
      body: "Your organisation pays. Families never pay a cent. Full access for as long as they need it, with no subscription, no upsell.",
    },
    {
      icon: "book",
      iconSrc: "/images/grief-awareness.png?v=3",
      title: "Increased Grief Awareness",
      body: "16 expert-led courses and 94 science-backed lessons on grief, sleep, and resilience, built into the platform for the moments after loss.",
    },
  ],
};

/** Business-only, 4-step "how it works" block. */
export const businessPartnership: BusinessPartnershipContent = {
  kicker: "How it works",
  headline: "From partnership to family support",
  subhead:
    "A clear path for your organisation, with no technical integration, and most partners are live with their people in under 30 days.",
  steps: [
    {
      num: 1,
      milestone: "Partner",
      title: "Sign on as a partner",
      body: "Your organisation joins Gently. We co-brand materials, brief managers, and shape a rollout plan for your workforce, members, or clients.",
    },
    {
      num: 2,
      milestone: "Introduce",
      title: "Share Gently with your people",
      body: "HR, benefits, or care teams introduce the benefit. We supply the language, assets, and a warm hand-off so uptake feels natural, not like another HR task.",
    },
    {
      num: 3,
      milestone: "Prepare",
      title: "People get ready ahead of time",
      body: "Individuals use Gently at their own pace: a secure vault, estate map, organised documents, and wellbeing support before crisis hits.",
    },
    {
      num: 4,
      milestone: "Support",
      title: "Families are supported when loss happens",
      body: "Loved ones inherit clarity: organised paperwork, a dedicated Care Team for admin and probate, and grief support that continues for as long as they need.",
    },
  ],
};

/** Business-only, Gently vs alternatives compare table. */
export const businessCompareTable: BusinessCompareTableContent = {
  kicker: "How gently compares",
  headline: "How gently compares to the usual ways of getting through it.",
  subhead:
    "The standard bereavement stack is a few days of leave, an EAP leaflet, and a hope that things settle down. Here is what your people are actually missing.",
  columns: [
    { name: "gently", tagline: "Complete coverage", highlight: true },
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
    { feature: "Technical integration required", cells: ["None", "None", "None", "N/A"] },
  ],
  footnote:
    "EAPs serve a real purpose, but bereavement needs more than a helpline. Gently sits alongside your existing benefits, not in place of them.",
};

/** Business-only — leader quote (partners hub + vertical pages). */
export const partnerLeaderQuote: PartnerLeaderQuoteContent = {
  paragraphs: [
    "After years supporting people through loss in large organisations, I rarely see anything that joins the practical and human sides so well.",
    "gently is the first platform I've seen that families and employers can actually rely on, long after the funeral.",
    "Gently represents the most significant step forward for bereavement support in years.",
  ],
  organization: "HSBC",
  attribution: "HSBC Ex Head of HR",
  learnMoreLabel: "Learn more",
  learnMoreHref: bookingUrl,
};

/** Individual, gently vs the usual alternatives after a loss. */
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

/** Business-only, pricing/model. Mirrors EverSettled's "free for X, paid by Y" framing. */
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
      paidBy: "100% free, with no excess, no out-of-pocket.",
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
export const navLoginHref = sectionHref(ROUTES.forYou, "cta");

/** Footer link grid */
export const footerColumns: FooterColumn[] = [
  {
    heading: "For You",
    links: [
      { label: "For You", href: ROUTES.forYou },
      { label: "Care Team", href: sectionHref(ROUTES.forYou, "solution") },
      { label: "The problem", href: sectionHref(ROUTES.forYou, "problem") },
      { label: "FAQ", href: sectionHref(ROUTES.forYou, "faq") },
    ],
  },
  {
    heading: navPartnersMenu,
    links: [
      { label: "For All Partners", href: ROUTES.partners },
      ...b2bSolutions.map((s) => ({
        label: s.title.replace(/^For /, ""),
        href: s.href,
      })),
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our mission", href: ROUTES.mission },
      { label: navContactLabel, href: ROUTES.contact },
      { label: "About gently", href: sectionHref(ROUTES.forYou, "bereavement-intro") },
      { label: "Science & research", href: sectionHref(ROUTES.forYou, "science") },
      { label: "FAQ", href: sectionHref(ROUTES.forYou, "faq") },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: sectionHref(ROUTES.forYou, "cta") },
      { label: "Terms", href: sectionHref(ROUTES.forYou, "cta") },
      { label: "Crisis resources", href: sectionHref(ROUTES.forYou, "faq") },
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
  { title: "About gently", href: sectionHref(ROUTES.forYou, "bereavement-intro") },
  { title: "Science & research", href: sectionHref(ROUTES.forYou, "science") },
  { title: "Who it's for", href: sectionHref(ROUTES.forYou, "who") },
  { title: "FAQ", href: sectionHref(ROUTES.forYou, "faq") },
  { title: "What people say", href: sectionHref(ROUTES.forYou, "testimonials") },
];

/** Floating chat, email + message lead capture */
export const chatWidget: ChatWidgetContent = {
  launcherLabel: "Ask a question",
  agentName: "gently",
  individual: {
    headerSubtext: "Our team can also help",
    welcomeMessages: [
      "Hi there! You're speaking with the gently team. We're here to answer questions about support after loss, for you or someone you're caring for.",
      "How can we help?",
    ],
  },
  business: {
    headerSubtext: "Partnerships & employer support",
    welcomeMessages: [
      "Hi there! You're speaking with the gently partnerships team. We work with HR and benefits leaders to offer bereavement support that's free for employees, estate, admin, and grief wellbeing in one place.",
      "What would you like to explore: roll-out, pricing, or how gently fits your organisation?",
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
    "Thank you. We've received your message. Someone from the team will reply by email shortly.",
  errorMessage: "We couldn't send that. Please try again in a moment.",
  networkError: "Something went wrong. Check your connection and try again.",
};

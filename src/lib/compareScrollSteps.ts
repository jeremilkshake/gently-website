// src/lib/compareScrollSteps.ts
//
// Data for the compare-scroll section. Keep all copy here (or re-export from
// content.ts if you prefer a single source — the shape is what matters).

import type { CompareColumnData } from "@/components/sections/compare/CompareColumn";
import type { CompareCardData } from "@/components/sections/compare/CompareCard";

/** Invisible slot so gently’s deck matches Without Gently’s step count. */
function gentlySpacer(index: number): CompareCardData {
  return { index, title: "", description: "", isSpacer: true };
}

const withoutGently: CompareColumnData = {
  title: "Without Gently",
  variant: "negative",
  counterTo: 400,            // counts 0 -> 400 hrs as the column completes
  counterUnit: "hrs",
  donePillLabel: "Finally done",
  cards: [
    {
      index: 0,
      title: "Scour the internet at 2am",
      description:
        'Google "what to do when someone dies" and fall into a rabbit hole of conflicting advice, outdated gov pages, and forum posts.',
    },
    {
      index: 1,
      title: "Hunt for the death certificate",
      description:
        'Someone mentions you need a death certificate, and you don\'t know where to get it, how many you need, or why everyone keeps asking for "original copies."',
    },
    {
      index: 2,
      title: "Race to register in time",
      description:
        'Get told to "register the death within 5 days" while you\'re still in shock.',
    },
    {
      index: 3,
      title: "Guess at every price",
      description:
        "Prices are opaque, comparisons awkward, and everything feels urgent and expensive.",
    },
    {
      index: 4,
      title: "Dig through every drawer",
      description:
        "Spend hours digging through drawers, emails, and old paperwork trying to figure out what even exists.",
    },
    {
      index: 5,
      title: "Guess if probate applies",
      description:
        "Not sure if you even need probate, but afraid of getting it wrong.",
    },
    {
      index: 6,
      title: "Miss who owns each task",
      description:
        "Unclear who is responsible for what: executor? next of kin? everyone? no one?",
    },
    {
      index: 7,
      title: "Resend the same documents",
      description: "Send documents. Get asked to resend them.",
    },
    {
      index: 8,
      title: "Lose weekends to paperwork",
      description:
        "Weekends disappear into paperwork instead of rest and recovery.",
    },
    {
      index: 9,
      title: "Finally, somehow, done.",
      description:
        "The whole process feels isolating, bureaucratic, and quietly overwhelming, and it took over a year.",
    },
  ],
};

const withGently: CompareColumnData = {
  title: "With Gently",
  variant: "positive",
  counterTo: 300,            // counts 0 -> 300+ hrs saved as the column completes
  counterSuffix: "+",
  counterUnit: "hrs saved",
  donePillLabel: "Done",
  cards: [
    {
      index: 0,
      title: "Match with a Care Manager",
      description:
        "Answer a few questions so we understand your situation. A dedicated Care Manager works with you and your family from day one.",
    },
    {
      index: 1,
      title: "Get a step-by-step plan",
      description:
        "Your Care Manager maps out exactly what needs to happen, from registering the death to closing accounts. Always know what's next.",
    },
    {
      index: 2,
      title: "Handle the logistics",
      description:
        "We coordinate with banks, solicitors, HMRC, and providers on your behalf. Letters drafted, calls made, paperwork filed.",
    },
    {
      index: 3,
      title: "Delegate and share tasks",
      description:
        "Bring in family or a trusted friend. Assign tasks, track progress, keep everyone aligned, with no group chat chaos.",
    },
    {
      index: 4,
      title: "Tend to emotional needs",
      description:
        "Science-backed wellbeing courses built for the 3am moments, with grief support alongside the admin, not saved for later.",
    },
    {
      index: 5,
      title: "Access ongoing support",
      description:
        "Your Care Manager stays as long as you need. A week or eighteen months, gently is there for the long tail of loss.",
    },
    gentlySpacer(6),
    gentlySpacer(7),
    gentlySpacer(8),
    gentlySpacer(9),
  ],
};

export const COMPARE_COLUMNS: [CompareColumnData, CompareColumnData] = [
  withoutGently,
  withGently,
];

export const COMPARE_SECTION_COPY = {
  eyebrow: "The difference",
  line1: "Complete coverage. Measurable impact.",
  line2: "One platform.",
  subheadingPrefix: "Before and after ",
  subheadingBrand: "gently.",
};

import { DISCLAIMER_SHORT, HONESTY } from "./site";

export type ArchetypeId =
  | "compromised"
  | "replacement"
  | "two-faced"
  | "claim"
  | "invoice"
  | "yellow";

export type Archetype = {
  id: ArchetypeId;
  name: string;
  pattern: string;
  summary: string;
  means: string;
  next: string[];
};

export type QuizOption = {
  id: string;
  label: string;
  archetypeId: ArchetypeId;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

const PRIORITY: ArchetypeId[] = [
  "compromised",
  "replacement",
  "two-faced",
  "claim",
  "invoice",
  "yellow",
];

export const archetypes: Archetype[] = [
  {
    id: "compromised",
    name: "The Compromised Site",
    pattern: "Malware, phishing, or unwanted software",
    summary: "The story you told sounds like an unsafe destination, not a punctuation fix.",
    means: "Platforms use malware and compromised-site language when they think the page, a tag, or a download is harming people. That is a site-safety problem. This sketch cannot see your site and cannot clear it.",
    next: [
      "Pause ads to that URL and look for scripts, popups, or downloads you did not add.",
      "Fix the site before you consider an appeal in the official ads interface.",
      "Do not send traffic through a lookalike domain to dodge the warning.",
    ],
  },
  {
    id: "replacement",
    name: "The Replacement Account",
    pattern: "Circumvention",
    summary: "The impulse in your answers is to start over somewhere the last suspension cannot see.",
    means: "Opening another ads account, domain, or payment profile after a suspension is the pattern circumvention rules describe. Platforms treat that more seriously than the original disapproval. This sketch is not a guide to doing it.",
    next: [
      "Stop new accounts and new domains until you have read the original notice.",
      "Read the circumvention policy on the official Google Ads or Meta site.",
      "If you contact support, describe what you stopped. This site will not contact them for you.",
    ],
  },
  {
    id: "two-faced",
    name: "The Two-Faced Landing Page",
    pattern: "Cloaking or destination mismatch",
    summary: "Your answers describe an ad and a landing page that may not be the same offer.",
    means: "Cloaking and destination mismatches mean review and a real visitor do not see the same thing. Swapping the URL after a warning and turning ads back on keeps that pattern going.",
    next: [
      "Open the final URL in a private window and compare it with the ad, line by line.",
      "Remove redirects that show one page to review and another to customers.",
      "Appeal only after the ad and the page tell the same story, using the platform's own form.",
    ],
  },
  {
    id: "claim",
    name: "The Oversized Claim",
    pattern: "Misrepresentation",
    summary: "The answers lean toward claims the page may not be able to stand behind.",
    means: "Misrepresentation is about offers, results, or identity that the page does not support. Calling it normal marketing does not change how the policy is written. This card does not decide whether your claims are true.",
    next: [
      "Write down every promise in the ad and mark which ones the page actually shows.",
      "Remove the ones you cannot support before you ask for a review.",
      "Expect a misrepresentation label to be treated as serious, not as a typo.",
    ],
  },
  {
    id: "invoice",
    name: "The Unpaid Invoice",
    pattern: "Billing",
    summary: "Your answers point at a payment method or a balance, not a disguised page.",
    means: "Billing limits are often a declined card or an unpaid balance. They still freeze delivery. A billing sentence can also share an email with a policy sentence, so read past the first paragraph.",
    next: [
      "Update the payment method or pay the balance in the official billing page.",
      "Do not send card numbers to this website.",
      "If the same email names a policy, deal with that too. Billing is not a free pass.",
    ],
  },
  {
    id: "yellow",
    name: "The First Yellow Card",
    pattern: "Editorial or a first notice",
    summary: "Your answers sound like a first disapproval or a style fix more than a ban-evasion story.",
    means: "Editorial issues and a first disapproved ad are often fixable in the ad itself. This sketch will miss a serious suspension if your answers softened it. The email is the source of truth.",
    next: [
      "Fix the capitalization, punctuation, or wording the notice actually names.",
      "Check the subject line: one disapproved ad is not the same as a suspended account.",
      "If the email names circumvention, cloaking, or misrepresentation, trust those words over this archetype.",
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "phrase",
    prompt: "Which phrase showed up in the notice, or closest to it?",
    options: [
      {
        id: "phrase-malware",
        archetypeId: "compromised",
        label: "Malware, phishing, unwanted software, or a compromised site",
      },
      {
        id: "phrase-circumvent",
        archetypeId: "replacement",
        label: "Circumventing systems, or evasion",
      },
      {
        id: "phrase-cloak",
        archetypeId: "two-faced",
        label: "Cloaking, or the destination does not match",
      },
      {
        id: "phrase-misrep",
        archetypeId: "claim",
        label: "Misrepresentation or unacceptable business practices",
      },
      {
        id: "phrase-billing",
        archetypeId: "invoice",
        label: "Billing, payment method, or unpaid balance",
      },
      {
        id: "phrase-editorial",
        archetypeId: "yellow",
        label: "Editorial, capitalization, or one disapproved ad",
      },
    ],
  },
  {
    id: "after",
    prompt: "What did you do within a day of reading it?",
    options: [
      {
        id: "after-offline",
        archetypeId: "compromised",
        label: "Took the site offline to look for scripts I did not add",
      },
      {
        id: "after-new-account",
        archetypeId: "replacement",
        label: "Started a new ads account or a new domain",
      },
      {
        id: "after-swap-url",
        archetypeId: "two-faced",
        label: "Swapped the landing URL and turned the ads back on",
      },
      {
        id: "after-rewrite",
        archetypeId: "claim",
        label: "Rewrote the headline claims and relaunched the same offer",
      },
      {
        id: "after-card",
        archetypeId: "invoice",
        label: "Updated the card on file",
      },
      {
        id: "after-punctuation",
        archetypeId: "yellow",
        label: "Fixed punctuation and looked up the policy name",
      },
    ],
  },
  {
    id: "page",
    prompt: "What was the landing page's relationship to the ad?",
    options: [
      {
        id: "page-popups",
        archetypeId: "compromised",
        label: "Popups, forced downloads, or tags I do not recognize",
      },
      {
        id: "page-lookalike",
        archetypeId: "replacement",
        label: "A lookalike domain on a newer account",
      },
      {
        id: "page-different",
        archetypeId: "two-faced",
        label: "Reviewers might see a different page than customers",
      },
      {
        id: "page-promises",
        archetypeId: "claim",
        label: "The page promises results the product does not show",
      },
      {
        id: "page-card",
        archetypeId: "invoice",
        label: "The page is fine. The card failed.",
      },
      {
        id: "page-same",
        archetypeId: "yellow",
        label: "Same offer, same page, as far as I know",
      },
    ],
  },
  {
    id: "history",
    prompt: "How many times has an ads account of yours been limited or suspended?",
    options: [
      {
        id: "history-hacked",
        archetypeId: "compromised",
        label: "The site was hacked, and that is what the notice is about",
      },
      {
        id: "history-another",
        archetypeId: "replacement",
        label: "More than once, and I opened another account",
      },
      {
        id: "history-same-ads",
        archetypeId: "claim",
        label: "More than once, on the same account, with the same ads",
      },
      {
        id: "history-payment",
        archetypeId: "invoice",
        label: "A payment failure paused delivery before",
      },
      {
        id: "history-first",
        archetypeId: "yellow",
        label: "This is the first notice I have seen",
      },
    ],
  },
  {
    id: "hope",
    prompt: "Which hope sounds most like yours right now?",
    options: [
      {
        id: "hope-hacked",
        archetypeId: "compromised",
        label: "The site was hacked. The offer itself is not the issue.",
      },
      {
        id: "hope-fresh",
        archetypeId: "replacement",
        label: "A fresh account would let me keep spending.",
      },
      {
        id: "hope-hide",
        archetypeId: "two-faced",
        label: "If review saw a calmer page, the ads would pass.",
      },
      {
        id: "hope-marketing",
        archetypeId: "claim",
        label: "The claims are normal marketing. The policy is fussy.",
      },
      {
        id: "hope-card",
        archetypeId: "invoice",
        label: "It is just a card decline.",
      },
      {
        id: "hope-typo",
        archetypeId: "yellow",
        label: "It is a typo, or shouty capitalization, in the headline.",
      },
    ],
  },
];

export function getArchetype(id: ArchetypeId): Archetype {
  const found = archetypes.find((item) => item.id === id);
  if (!found) return archetypes[archetypes.length - 1];
  return found;
}

export function pickArchetype(counts: Record<string, number>): Archetype {
  let bestId: ArchetypeId = "yellow";
  let bestCount = 0;
  for (const id of PRIORITY) {
    const count = counts[id] ?? 0;
    if (count > bestCount) {
      bestCount = count;
      bestId = id;
    }
  }
  return getArchetype(bestId);
}

export type QuizScore = {
  archetype: Archetype;
  counts: Record<string, number>;
};

export function scoreQuiz(optionIds: string[]): QuizScore | null {
  if (optionIds.length !== quizQuestions.length) return null;
  const counts: Record<string, number> = {};
  for (let index = 0; index < quizQuestions.length; index += 1) {
    const option = quizQuestions[index].options.find((item) => item.id === optionIds[index]);
    if (!option) return null;
    counts[option.archetypeId] = (counts[option.archetypeId] ?? 0) + 1;
  }
  return { archetype: pickArchetype(counts), counts };
}

export function summarizeArchetype(archetype: Archetype): string {
  const steps = archetype.next.map((step, index) => `${index + 1}. ${step}`).join("\n");
  return [
    `Ads Risk Check quiz — ${archetype.name}`,
    `Pattern: ${archetype.pattern}`,
    archetype.summary,
    archetype.means,
    "",
    "Next:",
    steps,
    "",
    "A 5-answer sketch, not a reading of Google's or Meta's decision.",
    DISCLAIMER_SHORT,
    HONESTY,
  ].join("\n");
}

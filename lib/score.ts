import { DISCLAIMER_SHORT, HONESTY } from "./site";

export type RiskLevel = "HIGH" | "MED" | "LOW";
export type SignalSeverity = "high" | "med" | "low";
export type Platform = "Google Ads" | "Meta Ads" | "Google & Meta" | "Unspecified";

export type ScoreReason = {
  id: string;
  label: string;
  severity: SignalSeverity;
  explanation: string;
};

export type ScoreSuccess = {
  ok: true;
  level: RiskLevel;
  score: number;
  platform: Platform;
  reasons: ScoreReason[];
  checklist: string[];
  headline: string;
  detail: string;
};

export type ScoreFailure = {
  ok: false;
  error: string;
};

export type ScoreResult = ScoreSuccess | ScoreFailure;

type Signal = {
  id: string;
  label: string;
  severity: SignalSeverity;
  weight: number;
  patterns: RegExp[];
  explanation: string;
  steps: string[];
};

const BASE_STEPS = [
  "Save the full notice before you change the account, the site, or the ads.",
  "If you appeal, use Google's or Meta's own form. This site does not file appeals.",
  "Do not open a replacement ads account to get around a suspension.",
];

const NO_MATCH_REASON: ScoreReason = {
  id: "no-keyword-match",
  label: "No strong policy phrase",
  severity: "low",
  explanation:
    "None of the serious, billing, or editorial phrases in this scorecard showed up. The notice may still matter. This checker only knows a fixed word list.",
};

const signals: Signal[] = [
  {
    id: "circumvention",
    label: "Circumvention",
    severity: "high",
    weight: 6,
    patterns: [
      /\bcircumvent(?:ing|ion|ed|s)?\b/i,
      /\bevading systems\b/i,
    ],
    explanation:
      "Circumventing systems is the phrase platforms use for trying to dodge a suspension or a review, including new accounts and other workarounds. Notices with this phrase are among the more serious ones.",
    steps: [
      "Do not open a new ads account, domain, or payment profile to replace a suspended one.",
      "Read the platform's circumvention policy before you write to support, and describe what you stopped doing.",
    ],
  },
  {
    id: "cloaking",
    label: "Cloaking",
    severity: "high",
    weight: 6,
    patterns: [/\bcloak(?:ing|ed)?\b/i],
    explanation:
      "Cloaking means reviewers and visitors are not shown the same page. Platforms treat that as a serious policy problem, separate from a normal destination typo.",
    steps: [
      "Show reviewers and visitors the same page. Cloaking means those two experiences differ.",
      "Do not keep swapping the URL just to slip past review.",
    ],
  },
  {
    id: "misrepresentation",
    label: "Misrepresentation",
    severity: "high",
    weight: 6,
    patterns: [/\bmisrepresentation\b/i, /\bdeceptive (?:ads?|practices|claims)\b/i],
    explanation:
      "Misrepresentation covers claims, pages, or identities that do not match what a person gets. Google treats this policy as a common reason for a hard suspension. Matching the word is not proof the label is fair.",
    steps: [
      "List every claim in the ad and on the page. Remove claims the page does not support.",
      "A misrepresentation label is serious. This card cannot tell you whether an appeal will be accepted.",
    ],
  },
  {
    id: "serious-conduct",
    label: "Serious conduct language",
    severity: "high",
    weight: 6,
    patterns: [
      /\bunacceptable business practices\b/i,
      /\begregious (?:violation|policy)\b/i,
      /\bscam\b/i,
    ],
    explanation:
      "Phrases like unacceptable business practices or egregious violation are labels platforms use for conduct they consider especially harmful. Read the official examples before you assume what they meant.",
    steps: [
      "Look up the exact policy name from the notice on the official Google Ads or Meta policy site.",
      "Do not treat a serious-conduct label like a capitalization fix.",
    ],
  },
  {
    id: "malware",
    label: "Malware or compromised site",
    severity: "high",
    weight: 6,
    patterns: [
      /\bmalware\b/i,
      /\bunwanted software\b/i,
      /\bphishing\b/i,
      /\bcompromised (?:site|website)\b/i,
      /\bmalicious (?:software|code|redirects?)\b/i,
    ],
    explanation:
      "Malware, phishing, unwanted software, or a compromised site means the platform thinks the destination is unsafe. That is a site-safety problem, not a headline edit.",
    steps: [
      "Pause traffic to the site and look for tags, popups, or downloads you did not add.",
      "If the site was compromised, fix that before you consider an appeal.",
    ],
  },
  {
    id: "counterfeit",
    label: "Counterfeit goods",
    severity: "high",
    weight: 6,
    patterns: [/\bcounterfeit(?:s|ing)?\b/i],
    explanation:
      "Counterfeit is a prohibited-goods label. The checker only saw the word. It cannot tell genuine stock from a policy mistake.",
    steps: [
      "Stop advertising anything the notice calls counterfeit.",
      "If the goods are legitimate, gather proof of authenticity for the platform. Do not upload identity documents here.",
    ],
  },
  {
    id: "billing",
    label: "Billing or payment",
    severity: "med",
    weight: 3,
    patterns: [
      /\bbilling\b/i,
      /\bpayment method\b/i,
      /\bunpaid balance\b/i,
      /\bpayment (?:declined|failed|unsuccessful)\b/i,
    ],
    explanation:
      "Billing language often means a card, balance, or payment method problem. It can sit next to a separate policy issue, so read the whole notice.",
    steps: [
      "Open the official Google Ads or Meta billing page and fix the payment method or balance the notice names.",
      "Read the rest of the email in case a policy issue is listed beside billing.",
    ],
  },
  {
    id: "destination",
    label: "Destination mismatch",
    severity: "med",
    weight: 3,
    patterns: [
      /\bdestination (?:not working|mismatch|url|experience|requirements)\b/i,
      /\bdestination (?:doesn't|does not) match\b/i,
    ],
    explanation:
      "Destination wording means the URL, the page, or the experience after the click did not match what the ad promised or what review could open.",
    steps: [
      "Open the final URL in a private window and compare it with the ad. The offer and the page should match.",
      "Remove extra redirects that send people somewhere the ad did not describe.",
    ],
  },
  {
    id: "trademark",
    label: "Trademark",
    severity: "med",
    weight: 3,
    patterns: [/\btrademarks?\b/i],
    explanation:
      "Trademark wording usually means a brand term in the ad or keyword list. The brand owner is not this website, and the checker cannot clear rights.",
    steps: [
      "Check whether the ad uses a brand you are allowed to advertise.",
      "Follow the trademark instructions in the official ads policy, not a rewritten version of the brand term meant to sneak through.",
    ],
  },
  {
    id: "restricted",
    label: "Restricted category",
    severity: "med",
    weight: 3,
    patterns: [
      /\brestricted (?:products?|content|business(?:es)?|industry|categories)\b/i,
      /\bprohibited (?:products?|content|financial products?)\b/i,
      /\bgambling\b/i,
      /\bpayday loans?\b/i,
      /\bcryptocurrency\b/i,
      /\badult content\b/i,
    ],
    explanation:
      "Gambling, cryptocurrency, payday loans, adult content, and other restricted or prohibited categories follow extra platform rules. Some are not allowed at all. The allowed path, if any, is on the official policy page.",
    steps: [
      "Find the category the notice names and read that official policy, including country limits.",
      "Do not look for a workaround account. Restricted does not mean hidden.",
    ],
  },
  {
    id: "verification",
    label: "Verification",
    severity: "med",
    weight: 3,
    patterns: [
      /\bbusiness verification\b/i,
      /\bidentity verification\b/i,
      /\badvertiser verification\b/i,
      /\bunverified (?:business|advertiser)\b/i,
    ],
    explanation:
      "Verification language means the platform wants identity or business documents inside its own interface. This site does not collect those documents.",
    steps: [
      "Complete advertiser or business verification in the official ads interface.",
      "Do not email passports, licenses, or bank documents to a digest form or a random helper.",
    ],
  },
  {
    id: "limited",
    label: "Account limited",
    severity: "med",
    weight: 3,
    patterns: [
      /\baccount (?:is |has been |was )?limited\b/i,
      /\badvertising access (?:is |has been |was )?restricted\b/i,
    ],
    explanation:
      "Limited or restricted access usually means some campaigns, billing, or features are blocked. It is a real constraint, and it is not the same phrase as a single ad disapproval.",
    steps: [
      "Read which feature the notice says is limited before you change every ad.",
      "Keep the original notice. A later email may name a different policy.",
    ],
  },
  {
    id: "repeated",
    label: "Repeat violations",
    severity: "med",
    weight: 3,
    patterns: [
      /\brepeated violations?\b/i,
      /\bmultiple violations?\b/i,
      /\bhistory of violations?\b/i,
    ],
    explanation:
      "Repeat-violation language means the platform is not treating this as a one-off disapproval. The phrase still does not name the underlying rule. Find that rule in the notice.",
    steps: [
      "Collect earlier notices, not just the latest one, before you write an appeal.",
      "A first-time editorial fix is the wrong mental model when the email says repeated violations.",
    ],
  },
  {
    id: "editorial",
    label: "Editorial style",
    severity: "low",
    weight: 1,
    patterns: [
      /\beditorial\b/i,
      /\bcapitalization\b/i,
      /\bpunctuation\b/i,
      /\bgrammar\b/i,
      /\bspelling\b/i,
      /\bexcessive symbols\b/i,
    ],
    explanation:
      "Editorial phrases usually point at a headline or description: capitalization, punctuation, symbols, or grammar. That is often an ad-level fix, unless the rest of the notice says the account itself is suspended.",
    steps: [
      "Fix the headline or description the notice names, then re-read the email to see if it disapproved one ad or suspended the account.",
    ],
  },
  {
    id: "disapproval",
    label: "Ad disapproval",
    severity: "low",
    weight: 1,
    patterns: [/\bdisapproved\b/i, /\bdisapproval\b/i],
    explanation:
      "Disapproval often applies to one ad or asset. It is not automatically an account suspension. Trust the noun in the email: ad, asset, or account.",
    steps: [
      "Confirm whether the email disapproved one ad or suspended the whole account. Those are different outcomes.",
    ],
  },
];

const LEVEL_COPY: Record<RiskLevel, { headline: string; detail: string }> = {
  HIGH: {
    headline: "High risk wording",
    detail:
      "The notice uses phrases platforms reserve for serious problems such as circumvention, cloaking, malware, or misrepresentation. That raises practical risk. It is not a prediction that the account will stay suspended, and it is not a finding that you broke a rule.",
  },
  MED: {
    headline: "Medium risk wording",
    detail:
      "The notice looks closer to billing, destination, verification, a restricted category, or a limit than to the most severe policy labels. Fix the specific problem the email names. This score does not say the account will be restored.",
  },
  LOW: {
    headline: "Low risk wording",
    detail:
      "The words we recognized look closer to an editorial fix or a single ad disapproval than a serious account ban. If the email actually says the account is suspended, trust the email over this score. The heuristic only counts known phrases.",
  },
};

const NO_MATCH_COPY = {
  headline: "No listed phrase found",
  detail:
    "We did not recognize a phrase from this scorecard. That can mean a routine note, a template we do not list, or text that is not the notice. Read the policy name in the email and look it up on the official Google Ads or Meta help site.",
};

function hasMatch(text: string, pattern: RegExp): boolean {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  const global = new RegExp(pattern.source, flags);
  for (const match of text.matchAll(global)) {
    const start = match.index ?? 0;
    const before = text.slice(Math.max(0, start - 40), start);
    if (/\b(?:not|no|without|never)\W*$/i.test(before)) continue;
    return true;
  }
  return false;
}

export function detectPlatform(text: string): Platform {
  const google = /\b(?:google ads|google adsense|adsense|google merchant center)\b/i.test(text);
  const meta = /\b(?:meta ads|facebook ads|instagram ads|meta business suite)\b/i.test(text);
  if (google && meta) return "Google & Meta";
  if (google) return "Google Ads";
  if (meta) return "Meta Ads";
  return "Unspecified";
}

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

export function scoreNotice(input: string): ScoreResult {
  const text = input.replace(/\s+/g, " ").trim().slice(0, 20_000);
  if (text.length < 20) {
    return {
      ok: false,
      error: "Paste more of the notice — at least a sentence. A few words is not enough for an honest score.",
    };
  }

  const matched = signals.filter((signal) =>
    signal.patterns.some((pattern) => hasMatch(text, pattern)),
  );
  const score = matched.reduce((sum, signal) => sum + signal.weight, 0);
  const level: RiskLevel = matched.some((signal) => signal.severity === "high")
    ? "HIGH"
    : matched.some((signal) => signal.severity === "med")
      ? "MED"
      : "LOW";

  const reasons: ScoreReason[] = matched.length
    ? matched.map((signal) => ({
        id: signal.id,
        label: signal.label,
        severity: signal.severity,
        explanation: signal.explanation,
      }))
    : [NO_MATCH_REASON];

  const specific = unique(matched.flatMap((signal) => signal.steps)).slice(0, 3);
  const extra = matched.length
    ? []
    : [
        "Find the policy name in the notice and open it on the official Google Ads or Meta help site.",
        "If this is a paraphrase or a forum post, paste the notice itself and check again.",
      ];
  const checklist = unique([...specific, ...extra, ...BASE_STEPS]).slice(0, 6);
  const copy = matched.length ? LEVEL_COPY[level] : NO_MATCH_COPY;

  return {
    ok: true,
    level,
    score,
    platform: detectPlatform(text),
    reasons,
    checklist,
    headline: copy.headline,
    detail: copy.detail,
  };
}

export function summarizeScore(result: ScoreSuccess): string {
  const reasons = result.reasons
    .map((reason) => `- ${reason.label}: ${reason.explanation}`)
    .join("\n");
  const steps = result.checklist.map((step, index) => `${index + 1}. ${step}`).join("\n");
  return [
    `Ads Risk Check — ${result.level}`,
    `Platform: ${result.platform}`,
    result.headline,
    result.detail,
    "",
    "Reasons:",
    reasons,
    "",
    "Next steps:",
    steps,
    "",
    DISCLAIMER_SHORT,
    HONESTY,
  ].join("\n");
}

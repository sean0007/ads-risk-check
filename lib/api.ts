import { scoreNotice, summarizeScore } from "./score";
import { InputError, str, type Endpoint } from "./agent-api";
import { DISCLAIMER_SHORT, HONESTY, SITE_NAME, SITE_TAGLINE } from "./site";

export const PUBLIC_URL = "https://ads-risk-check.vercel.app";
export const API_DISCLAIMER = `${DISCLAIMER_SHORT} ${HONESTY} Not affiliated with Google or Meta. The API scores the text in memory and does not store it.`;
export const API_INFO = { title: `${SITE_NAME} API`, description: SITE_TAGLINE };

export const ENDPOINTS: Record<"score", Endpoint> = {
  score: {
    path: "/api/score",
    operationId: "adsNoticeRiskCheck",
    summary: "Read a Google Ads or Meta Ads suspension, disapproval, or policy notice and return a HIGH / MED / LOW risk card",
    description:
      "Paste the notice text (20 to 20,000 characters). Matches known policy phrases (circumvention, cloaking, misrepresentation, malware, counterfeit, billing, destination mismatch, trademark, restricted categories, verification, limited account, repeat violations, editorial, disapproval), ignores negated mentions, and returns the risk level, platform, reasons with plain-language explanations, and a next-step checklist. It never files appeals. Use POST for long notices.",
    params: [{ name: "notice", type: "string", required: true, description: "The full text of the ads policy notice or email. Do not include personal or account identifiers." }],
    example: "/api/score?notice=Your%20Google%20Ads%20headline%20was%20disapproved%20for%20editorial%20issues%3A%20excessive%20capitalization.%20The%20account%20remains%20active.",
    compute: (i) => {
      const notice = str(i, "notice");
      const result = scoreNotice(notice);
      if (!result.ok) throw new InputError(result.error);
      return { result, summaryText: summarizeScore(result) };
    },
  },
};

export const PLUGIN = {
  name: SITE_NAME,
  nameForModel: "ads_risk_check",
  descriptionForHuman: "Plain-language risk card for a Google Ads or Meta Ads suspension or policy notice.",
  descriptionForModel:
    "Use when an advertiser shares a Google Ads, AdSense, Merchant Center, Facebook or Instagram ads suspension, disapproval, or policy email and wants to know how serious it is and what to do next. Heuristic phrase matching only. Never suggest opening a replacement account. Relay the disclaimer: not legal advice, no reinstatement guarantee.",
  logo: "/icon.svg",
};

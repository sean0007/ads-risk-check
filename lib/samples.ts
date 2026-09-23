import type { RiskLevel } from "./score";

export type SampleNotice = {
  id: string;
  label: string;
  level: RiskLevel;
  text: string;
};

export const sampleNotices: SampleNotice[] = [
  {
    id: "high",
    label: "Serious policy",
    level: "HIGH",
    text: "Your Google Ads account has been suspended for circumventing systems. We detected cloaking on the destination and unacceptable business practices related to misrepresentation. This suspension is tied to those policies.",
  },
  {
    id: "med",
    label: "Billing limit",
    level: "MED",
    text: "Your Meta Ads account is limited because of a billing issue. The payment method was declined and there is an unpaid balance. Update your payment method in Billing to continue.",
  },
  {
    id: "low",
    label: "Editorial disapproval",
    level: "LOW",
    text: "Your Google Ads headline was disapproved for editorial issues: excessive capitalization and punctuation. The account remains active.",
  },
];

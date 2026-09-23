export const SITE_NAME = "Ads Risk Check";

export const SITE_TAGLINE =
  "Paste a Google Ads or Meta Ads notice. Get a plain-language risk card.";

export const DISCLAIMER_SHORT =
  "Not legal advice. Educational only. We do not appeal accounts for you.";

export const HONESTY =
  "Heuristic scorecard only. Not a guarantee Google or Meta will reinstate any account.";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "http://localhost:3000";
}

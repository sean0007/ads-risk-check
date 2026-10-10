import { SIGNAL_IDS, scoreFromSignals, type Platform, type ScoreSuccess } from "./score";

export const PUBLIC_URL = "https://ads-risk-check.vercel.app";

/**
 * Share links carry only the matched phrase-group ids and the platform, never the notice text,
 * because a pasted ads notice can name the business, account ids, or emails.
 * `s` = comma-separated phrase-group ids (or "none" for a notice with no listed phrase), `p` = platform code.
 */
const PLATFORM_CODES: Record<string, Platform> = {
  google: "Google Ads",
  meta: "Meta Ads",
  both: "Google & Meta",
  none: "Unspecified",
};
const CODE_FOR: Record<Platform, string> = {
  "Google Ads": "google",
  "Meta Ads": "meta",
  "Google & Meta": "both",
  Unspecified: "none",
};

export type ShareInputs = { signals: string[]; platform: Platform };

/** Example used in the sitemap, llms.txt, and the canary: the built-in "Meta disabled" sample. */
export const EXAMPLE_INPUTS: ShareInputs = { signals: ["meta-disabled", "meta-restricted"], platform: "Meta Ads" };

type Params = URLSearchParams | Record<string, string | string[] | undefined>;

function get(p: Params, key: string): string | undefined {
  if (p instanceof URLSearchParams) return p.get(key) ?? undefined;
  const v = p[key];
  return Array.isArray(v) ? v[0] : v;
}

/** Known ids only, de-duplicated, in the scorer's own order. Unknown ids are dropped. */
function cleanSignals(ids: readonly string[]): string[] {
  const wanted = new Set(ids.map((id) => id.trim().toLowerCase()));
  return SIGNAL_IDS.filter((id) => wanted.has(id));
}

/** Reads a share link. Returns null when the link has no result (no `s`, or only unknown ids). */
export function parseResultParams(p: Params): ShareInputs | null {
  const raw = get(p, "s");
  if (raw === undefined || raw.trim() === "") return null;
  const platform = PLATFORM_CODES[(get(p, "p") ?? "").trim().toLowerCase()] ?? "Unspecified";
  if (raw.trim().toLowerCase() === "none") return { signals: [], platform };
  const signals = cleanSignals(raw.split(","));
  return signals.length ? { signals, platform } : null;
}

export function resultQuery(inputs: ShareInputs): string {
  const signals = cleanSignals(inputs.signals);
  const q = new URLSearchParams();
  q.set("s", signals.length ? signals.join(",") : "none");
  q.set("p", CODE_FOR[inputs.platform] ?? "none");
  return q.toString().replace(/%2C/g, ",");
}

export const inputsFromResult = (r: ScoreSuccess): ShareInputs => ({
  signals: r.reasons.map((reason) => reason.id).filter((id) => SIGNAL_IDS.includes(id)),
  platform: r.platform,
});
export const resultFromInputs = (inputs: ShareInputs): ScoreSuccess => scoreFromSignals(inputs.signals, inputs.platform);
export const resultPath = (inputs: ShareInputs) => `/r?${resultQuery(inputs)}`;
export const ogPath = (inputs: ShareInputs) => `/og?${resultQuery(inputs)}`;
export const isExample = (inputs: ShareInputs) => resultQuery(inputs) === resultQuery(EXAMPLE_INPUTS);

/** Headline for <title>, H1, and share text, built only from the scorer's own result. */
export function resultHeadline(r: ScoreSuccess): string {
  const platform = r.platform === "Unspecified" ? "ads" : r.platform;
  const labels = r.reasons.map((reason) => reason.label);
  const what = labels.length > 2 ? `${labels.slice(0, 2).join(", ")} +${labels.length - 2} more` : labels.join(" + ");
  return `${r.level} risk ${platform} notice: ${what}`;
}

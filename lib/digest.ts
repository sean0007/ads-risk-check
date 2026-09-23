export type LocalDigestEntry = {
  email: string;
  savedAt: string;
};

export type WebhookResolution =
  | { mode: "local" }
  | { mode: "webhook"; url: string }
  | { mode: "invalid" };

export type DigestPlan =
  | { type: "invalid-email" }
  | { type: "local" }
  | { type: "bad-webhook" }
  | {
      type: "forward";
      url: string;
      payload: { email: string; source: "ads-risk-check"; receivedAt: string };
    };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const LOCAL_DIGEST_KEY = "ads-risk-check.digest.v1";

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (!EMAIL.test(email)) return null;
  return email;
}

export function resolveWebhook(raw: string | undefined): WebhookResolution {
  const trimmed = raw?.trim();
  if (!trimmed) return { mode: "local" };
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return { mode: "invalid" };
    return { mode: "webhook", url: url.toString() };
  } catch {
    return { mode: "invalid" };
  }
}

export function planDigest(
  body: unknown,
  webhookEnv: string | undefined,
  now = new Date().toISOString(),
): DigestPlan {
  const record =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const email = normalizeEmail(record.email);
  if (!email) return { type: "invalid-email" };

  const webhook = resolveWebhook(webhookEnv);
  if (webhook.mode === "invalid") return { type: "bad-webhook" };
  if (webhook.mode === "local") return { type: "local" };

  return {
    type: "forward",
    url: webhook.url,
    payload: {
      email,
      source: "ads-risk-check",
      receivedAt: now,
    },
  };
}

function isEntry(value: unknown): value is LocalDigestEntry {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.email === "string" && typeof record.savedAt === "string";
}

export function readLocalDigest(storage: Pick<Storage, "getItem">): LocalDigestEntry[] {
  try {
    const raw = storage.getItem(LOCAL_DIGEST_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry).slice(-20);
  } catch {
    return [];
  }
}

export function rememberLocalDigest(
  storage: Pick<Storage, "getItem" | "setItem">,
  email: string,
  now = new Date().toISOString(),
): LocalDigestEntry[] {
  const next = readLocalDigest(storage).filter((entry) => entry.email !== email);
  next.push({ email, savedAt: now });
  const trimmed = next.slice(-20);
  storage.setItem(LOCAL_DIGEST_KEY, JSON.stringify(trimmed));
  return trimmed;
}

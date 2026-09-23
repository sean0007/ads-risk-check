import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  LOCAL_DIGEST_KEY,
  normalizeEmail,
  planDigest,
  readLocalDigest,
  rememberLocalDigest,
  resolveWebhook,
} from "./digest";

function memoryStorage(initial = "") {
  const data = new Map<string, string>();
  if (initial) data.set(LOCAL_DIGEST_KEY, initial);
  return {
    getItem(key: string) {
      return data.has(key) ? data.get(key)! : null;
    },
    setItem(key: string, value: string) {
      data.set(key, value);
    },
  };
}

describe("digest stub", () => {
  it("accepts a normal email and rejects junk", () => {
    assert.equal(normalizeEmail("  Ada@Example.com "), "ada@example.com");
    assert.equal(normalizeEmail("not-an-email"), null);
    assert.equal(normalizeEmail(""), null);
    assert.equal(normalizeEmail(12), null);
  });

  it("requires an https webhook", () => {
    assert.deepEqual(resolveWebhook(undefined), { mode: "local" });
    assert.deepEqual(resolveWebhook("  "), { mode: "local" });
    assert.equal(resolveWebhook("http://example.com/hook").mode, "invalid");
    assert.equal(resolveWebhook("not a url").mode, "invalid");
    assert.deepEqual(resolveWebhook("https://example.com/hook?token=abc"), {
      mode: "webhook",
      url: "https://example.com/hook?token=abc",
    });
  });

  it("stores nothing server-side when the webhook is unset", () => {
    const plan = planDigest({ email: "ada@example.com" }, undefined, "2026-09-23T00:00:00.000Z");
    assert.deepEqual(plan, { type: "local" });
  });

  it("plans a forward only for https webhooks", () => {
    const plan = planDigest(
      { email: "ada@example.com" },
      "https://hooks.example/digest",
      "2026-09-23T00:00:00.000Z",
    );
    assert.equal(plan.type, "forward");
    if (plan.type !== "forward") return;
    assert.equal(plan.url, "https://hooks.example/digest");
    assert.deepEqual(plan.payload, {
      email: "ada@example.com",
      source: "ads-risk-check",
      receivedAt: "2026-09-23T00:00:00.000Z",
    });
    assert.equal(planDigest({ email: "ada@example.com" }, "http://hooks.example").type, "bad-webhook");
    assert.equal(planDigest({ email: "nope" }, undefined).type, "invalid-email");
  });

  it("remembers an email only in the provided storage", () => {
    const storage = memoryStorage();
    const saved = rememberLocalDigest(storage, "ada@example.com", "2026-09-23T00:00:00.000Z");
    assert.deepEqual(saved, [{ email: "ada@example.com", savedAt: "2026-09-23T00:00:00.000Z" }]);
    rememberLocalDigest(storage, "ada@example.com", "2026-09-23T01:00:00.000Z");
    assert.equal(readLocalDigest(storage).length, 1);
    assert.equal(readLocalDigest(storage)[0]?.savedAt, "2026-09-23T01:00:00.000Z");
  });
});

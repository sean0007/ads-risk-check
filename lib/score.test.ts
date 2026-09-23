import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sampleNotices } from "./samples";
import { detectPlatform, scoreNotice, summarizeScore } from "./score";

describe("scoreNotice", () => {
  it("scores the built-in samples at the labeled level", () => {
    for (const sample of sampleNotices) {
      const result = scoreNotice(sample.text);
      assert.equal(result.ok, true);
      if (!result.ok) return;
      assert.equal(result.level, sample.level, sample.id);
    }
  });

  it("treats circumvention, cloaking, and misrepresentation as HIGH", () => {
    const result = scoreNotice(sampleNotices[0].text);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "HIGH");
    assert.equal(result.platform, "Google Ads");
    assert.deepEqual(
      result.reasons.map((reason) => reason.id),
      ["circumvention", "cloaking", "misrepresentation", "serious-conduct"],
    );
    assert.ok(result.score >= 6);
    assert.ok(result.checklist.some((step) => /replacement ads account/i.test(step)));
    assert.match(summarizeScore(result), /Not legal advice/);
  });

  it("treats billing and a limited account as MED", () => {
    const result = scoreNotice(sampleNotices[1].text);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "MED");
    assert.equal(result.platform, "Meta Ads");
    assert.deepEqual(
      result.reasons.map((reason) => reason.id),
      ["billing", "limited"],
    );
  });

  it("does not upgrade a generic suspension sentence to HIGH", () => {
    const result = scoreNotice(
      "Your account has been suspended for violating our policies. Please review the message.",
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "LOW");
    assert.equal(result.score, 0);
    assert.equal(result.reasons[0]?.id, "no-keyword-match");
    assert.equal(result.platform, "Unspecified");
  });

  it("keeps editorial capitalization at LOW", () => {
    const result = scoreNotice(sampleNotices[2].text);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "LOW");
    assert.ok(result.reasons.every((reason) => reason.severity === "low"));
  });

  it("ignores a negation that sits directly against the phrase", () => {
    const result = scoreNotice(
      "The issue is not cloaking. One Google Ads creative was disapproved for punctuation only. The account remains active.",
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "LOW");
    assert.equal(
      result.reasons.some((reason) => reason.id === "cloaking"),
      false,
    );
  });

  it("still matches cloaking when negation is not immediate", () => {
    const result = scoreNotice(
      "Support said this was not about a minor edit. They cited cloaking on the Google Ads destination.",
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "HIGH");
    assert.equal(
      result.reasons.some((reason) => reason.id === "cloaking"),
      true,
    );
  });

  it("detects both platforms", () => {
    assert.equal(
      detectPlatform("The Google Ads and Meta Ads notices arrived the same day."),
      "Google & Meta",
    );
  });

  it("rejects a short paste", () => {
    const result = scoreNotice("suspended");
    assert.deepEqual(result, {
      ok: false,
      error:
        "Paste more of the notice — at least a sentence. A few words is not enough for an honest score.",
    });
  });

  it("lets one serious phrase outweigh editorial words", () => {
    const result = scoreNotice(
      "Google Ads disapproved the ad for punctuation, then suspended the account for misrepresentation.",
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.level, "HIGH");
    assert.ok(result.reasons.some((reason) => reason.id === "editorial"));
    assert.ok(result.reasons.some((reason) => reason.id === "misrepresentation"));
  });
});

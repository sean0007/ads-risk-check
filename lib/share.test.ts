import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sampleNotices } from "./samples";
import { scoreNotice } from "./score";
import {
  EXAMPLE_INPUTS,
  inputsFromResult,
  isExample,
  ogPath,
  parseResultParams,
  resultFromInputs,
  resultHeadline,
  resultPath,
  resultQuery,
} from "./share";

const EXAMPLE_QUERY = "s=meta-disabled,meta-restricted&p=meta";

describe("share links", () => {
  it("example query is stable and round-trips", () => {
    assert.equal(resultQuery(EXAMPLE_INPUTS), EXAMPLE_QUERY);
    assert.deepEqual(parseResultParams(new URLSearchParams(EXAMPLE_QUERY)), EXAMPLE_INPUTS);
    assert.equal(resultPath(EXAMPLE_INPUTS), `/r?${EXAMPLE_QUERY}`);
    assert.equal(ogPath(EXAMPLE_INPUTS), `/og?${EXAMPLE_QUERY}`);
    assert.ok(isExample(EXAMPLE_INPUTS));
  });

  it("rebuilds exactly the same card as scoring the notice, for every sample", () => {
    for (const sample of sampleNotices) {
      const scored = scoreNotice(sample.text);
      assert.equal(scored.ok, true);
      if (!scored.ok) continue;
      const q = resultQuery(inputsFromResult(scored));
      const parsed = parseResultParams(new URLSearchParams(q));
      assert.ok(parsed, sample.id);
      assert.deepEqual(resultFromInputs(parsed!), scored, sample.id);
    }
  });

  it("never puts notice text in the link", () => {
    for (const sample of sampleNotices) {
      const scored = scoreNotice(sample.text);
      if (!scored.ok) continue;
      const q = decodeURIComponent(resultQuery(inputsFromResult(scored)));
      assert.ok(!q.includes(" "), sample.id);
      assert.ok(q.length < 120, sample.id);
      assert.ok(!sample.text.slice(0, 30).split(" ").slice(2, 5).every((w) => q.includes(w)), sample.id);
    }
  });

  it("handles a notice with no listed phrase", () => {
    const scored = scoreNotice("Thanks for advertising with us. Here is your monthly performance summary.");
    assert.equal(scored.ok, true);
    if (!scored.ok) return;
    const q = resultQuery(inputsFromResult(scored));
    assert.equal(q, "s=none&p=none");
    assert.deepEqual(resultFromInputs(parseResultParams(new URLSearchParams(q))!), scored);
  });

  it("drops unknown ids, de-dupes, and orders like the scorer", () => {
    const parsed = parseResultParams(new URLSearchParams("s=billing,<script>,CLOAKING,billing&p=GOOGLE"));
    assert.deepEqual(parsed, { signals: ["cloaking", "billing"], platform: "Google Ads" });
    assert.deepEqual(parseResultParams(new URLSearchParams("s=foo&p=meta")), null);
    assert.deepEqual(parseResultParams(new URLSearchParams("p=meta")), null);
    assert.deepEqual(parseResultParams({}), null);
    assert.deepEqual(parseResultParams({ s: ["editorial"], p: "zzz" }), { signals: ["editorial"], platform: "Unspecified" });
  });

  it("headline comes from the result only", () => {
    assert.equal(resultHeadline(resultFromInputs(EXAMPLE_INPUTS)), "MED risk Meta Ads notice: Ad account disabled + Restricted from advertising");
    const high = resultFromInputs({ signals: ["circumvention", "cloaking", "misrepresentation"], platform: "Google Ads" });
    assert.equal(resultHeadline(high), "HIGH risk Google Ads notice: Circumvention, Cloaking +1 more");
  });
});

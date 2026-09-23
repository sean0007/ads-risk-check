import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickArchetype, quizQuestions, scoreQuiz, summarizeArchetype } from "./quiz";

describe("scoreQuiz", () => {
  it("picks the archetype with the most answers", () => {
    const answers = [
      "phrase-billing",
      "after-card",
      "page-card",
      "history-payment",
      "hope-typo",
    ];
    const scored = scoreQuiz(answers);
    assert.ok(scored);
    assert.equal(scored?.archetype.id, "invoice");
  });

  it("breaks ties toward the more serious pattern", () => {
    assert.equal(
      pickArchetype({ compromised: 2, yellow: 2 }).id,
      "compromised",
    );
    assert.equal(pickArchetype({ invoice: 3, yellow: 1 }).id, "invoice");
    assert.equal(pickArchetype({}).id, "yellow");
  });

  it("returns null for an incomplete or unknown answer", () => {
    assert.equal(scoreQuiz(["phrase-billing"]), null);
    const wrong = quizQuestions.map(() => "nope");
    assert.equal(scoreQuiz(wrong), null);
  });

  it("summarizes a share line with the disclaimer", () => {
    const scored = scoreQuiz([
      "phrase-circumvent",
      "after-new-account",
      "page-lookalike",
      "history-another",
      "hope-fresh",
    ]);
    assert.equal(scored?.archetype.id, "replacement");
    if (!scored) return;
    const text = summarizeArchetype(scored.archetype);
    assert.match(text, /The Replacement Account/);
    assert.match(text, /Not legal advice/);
    assert.match(text, /not a guide/i);
  });
});

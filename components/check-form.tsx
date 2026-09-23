"use client";

import { useState } from "react";
import { ResultCard } from "@/components/result-card";
import { sampleNotices } from "@/lib/samples";
import { scoreNotice, type ScoreSuccess } from "@/lib/score";

export function CheckForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ScoreSuccess | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(nextText: string) {
    const scored = scoreNotice(nextText);
    if (!scored.ok) {
      setResult(null);
      setError(scored.error);
      return;
    }
    setError(null);
    setResult(scored);
  }

  return (
    <div>
      <label htmlFor="notice" className="block text-sm font-medium text-foreground">
        Suspension or policy notice
      </label>
      <textarea
        id="notice"
        name="notice"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            run(text);
          }
        }}
        maxLength={20000}
        spellCheck={false}
        placeholder="Paste the Google Ads or Meta Ads email here. Scoring uses a fixed phrase list in your browser."
        className="mt-2 min-h-48 w-full resize-y rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted focus:border-amber"
      />
      <p className="mt-2 text-sm text-muted">
        The notice is scored on this device. It is not uploaded and it is not sent to an AI API.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => run(text)}
          className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber/90"
        >
          Check risk
        </button>
        <div className="flex flex-wrap gap-2" aria-label="Sample notices">
          {sampleNotices.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setText(sample.text);
                run(sample.text);
              }}
              className="rounded-full border border-white/15 px-3 py-2 text-xs text-muted hover:bg-white/5 hover:text-foreground"
            >
              {sample.label} sample
            </button>
          ))}
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-rose-200">
          {error}
        </p>
      ) : null}
      <div aria-live="polite">{result ? <ResultCard result={result} /> : null}</div>
    </div>
  );
}

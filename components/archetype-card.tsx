"use client";

import { useState } from "react";
import { CardDisclaimer } from "@/components/card-disclaimer";
import { summarizeArchetype, type Archetype } from "@/lib/quiz";

export function ArchetypeCard({ archetype }: { archetype: Archetype }) {
  const [copied, setCopied] = useState(false);

  async function copySummary() {
    const text = summarizeArchetype(archetype);
    try {
      if (navigator.share) {
        await navigator.share({ title: archetype.name, text });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <article
        data-testid="archetype-card"
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e14] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="border-b border-white/10 px-5 py-5 sm:px-7">
          <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
            Ads Risk Check quiz
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            {archetype.name}
          </h2>
          <p className="mt-3 font-mono text-xs tracking-wide text-teal-200">{archetype.pattern}</p>
          <p className="mt-4 text-base leading-relaxed text-foreground">{archetype.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{archetype.means}</p>
        </div>
        <div className="px-5 py-5 sm:px-7">
          <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">What to do next</h3>
          <ol className="mt-3 space-y-3">
            {archetype.next.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="font-mono text-amber">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted">
            Five answers, one sketch. Not a reading of Google&apos;s or Meta&apos;s decision.
          </p>
        </div>
        <CardDisclaimer />
      </article>
      <button
        type="button"
        onClick={copySummary}
        className="mt-3 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
      >
        {copied ? "Copied" : "Copy or share"}
      </button>
    </div>
  );
}

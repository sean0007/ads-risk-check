import Link from "next/link";
import { CheckForm } from "@/components/check-form";
import { SponsorSlot } from "@/components/sponsor-slot";

const levels = [
  {
    level: "HIGH",
    className: "text-rose-300",
    text: "Serious phrases: circumvention, cloaking, malware, misrepresentation, counterfeit, unacceptable business practices.",
  },
  {
    level: "MED",
    className: "text-amber",
    text: "Mid-tier phrases: billing, destination problems, trademarks, restricted categories, verification, account limits, repeat violations.",
  },
  {
    level: "LOW",
    className: "text-teal-200",
    text: "Editorial or single-ad disapproval phrases. Also the result when no listed phrase appears.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
          Free educational scorecard
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Paste the suspension notice. Get a risk card.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Google Ads and Meta Ads emails are full of policy names. This page highlights phrases
          it knows and sorts them into HIGH, MED, or LOW, with a short checklist. It runs in your
          browser. It does not see your account, and it does not file an appeal.
        </p>
      </section>

      <section className="mt-8 max-w-3xl">
        <CheckForm />
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">What the labels mean</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {levels.map((item) => (
            <article key={item.level} className="rounded-3xl border border-line bg-panel/60 p-5">
              <h2 className={`font-display text-4xl ${item.className}`}>{item.level}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">How the score is made</h2>
        <ol className="mt-5 grid gap-4 text-sm leading-relaxed text-muted sm:grid-cols-3 sm:text-base">
          <li>
            <span className="block font-mono text-amber">01</span>
            Paste the notice, or load a labeled sample. The sample text is fictional.
          </li>
          <li>
            <span className="block font-mono text-amber">02</span>
            A fixed phrase list runs locally. Serious groups outweigh editorial words. The raw
            notice is not copied onto the card.
          </li>
          <li>
            <span className="block font-mono text-amber">03</span>
            Screenshot the card or copy the summary. Then read the policy the email actually names.
          </li>
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          A short &quot;not&quot; or &quot;never&quot; glued to a phrase is ignored. &quot;Not about cloaking&quot; still
          matches, because this is a keyword list, not a reader. Generic words like suspended or
          policy, on their own, do not raise the score.
        </p>
      </section>

      <section className="mt-16 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-line bg-panel/50 p-6">
          <h2 className="font-display text-3xl tracking-tight">Not ready to paste the email?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The quiz is a five-question sketch of the pattern in your answers: replacement
            account, two-faced landing page, unpaid invoice, and the rest. It is a personality
            card, not a lookup of your ads account.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber/90"
            >
              Take the quiz
            </Link>
            <Link
              href="/digest"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5"
            >
              Digest stub
            </Link>
          </div>
        </div>
        <SponsorSlot />
      </section>
    </div>
  );
}

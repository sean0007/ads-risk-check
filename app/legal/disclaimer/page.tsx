import type { Metadata } from "next";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: DISCLAIMER_SHORT,
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Read this</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
        Disclaimer
      </h1>
      <p className="mt-4 text-lg text-foreground">{DISCLAIMER_SHORT}</p>
      <p className="mt-2 text-muted">{HONESTY}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-base font-semibold text-foreground">What this is</h2>
          <p className="mt-2">
            Ads Risk Check is a free educational page. You paste text from a Google Ads or Meta
            Ads notice. A fixed list of phrases in your browser labels the text HIGH, MED, or
            LOW and suggests next steps. The quiz maps five answers to a named pattern. Neither
            feature looks up an ads account.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">What this is not</h2>
          <p className="mt-2">
            This is not legal advice, not a law firm, and not a Google, Meta, Facebook, or
            Instagram partner. Those names are used only because they appear on the notices
            people paste. We do not appeal accounts, we do not contact support for you, and we
            do not sell reinstatement. No payment on this site buys an appeal, a review, or a
            restored account.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">The score can be wrong</h2>
          <p className="mt-2">
            The label follows keywords. It misses policies that are not on the list. It can fire
            on a word used in an unrelated sentence. A nearby &quot;not&quot; is ignored only when it
            sits directly against the phrase. Trust the notice over the card. Nothing here is a
            guarantee that Google or Meta will reinstate, keep, or suspend an account.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Your text and your email</h2>
          <p className="mt-2">
            Notice text stays in the browser. Do not paste passwords or full payment card
            numbers. The digest form sends an email address to this site&apos;s server only so it
            can forward that address to an optional https webhook. With no webhook configured,
            the server stores nothing and the page tells you the address was saved in this
            browser only. Do not send identity documents to the digest.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Sponsorship</h2>
          <p className="mt-2">
            The dashed &quot;your ad here&quot; box is an empty slot. It does not load an ad network.
          </p>
        </section>
      </div>
    </div>
  );
}

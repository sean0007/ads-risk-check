import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { META_FAQ, META_GUIDE_PATH } from "@/lib/faq";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

const title = "Meta ad account disabled vs restricted: what's the difference?";
const description =
  "Disabled vs restricted Meta ad account, in plain words: what each one means, whether you can still run ads, how to request a review in Business Support Home, and the six-month limit. Plus a free notice checker.";

export const metadata: Metadata = {
  title: { absolute: `${title} · Ads Risk Check` },
  description,
  alternates: { canonical: META_GUIDE_PATH },
  openGraph: {
    title,
    description,
    url: META_GUIDE_PATH,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ads Risk Check risk card" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const rows = [
  {
    state: "Ad rejected",
    means: "One ad or asset broke a rule. The account keeps running.",
    ads: "Yes, other ads keep running.",
    next: "Edit the ad or request another review of that ad.",
  },
  {
    state: "Restricted",
    means:
      "Meta limited advertising on a profile, Page, ad account, or business portfolio: spend or payment limits, lost features, or no ads at all.",
    ads: "Sometimes. Depends on the limit.",
    next: "Find which asset is restricted in Business Support Home, then follow What you can do.",
  },
  {
    state: "Ad account disabled",
    means:
      "The ad account and its ads are switched off for advertising. Meta says it cannot be reactivated in place.",
    ads: "No.",
    next: "An admin requests a review in Business Support Home. The six-month clock matters.",
  },
  {
    state: "Closed",
    means: "Someone with control of the account closed it. Not a penalty.",
    ads: "No, until reopened.",
    next: "Use Reactivate account in Ads Manager or Business Suite.",
  },
];

const sources = [
  {
    href: "https://www.facebook.com/business/help/975570072950669",
    label: "Meta: About advertising restrictions",
  },
  {
    href: "https://www.facebook.com/business/help/422289316306981",
    label: "Meta: Troubleshoot a disabled or restricted account",
  },
  {
    href: "https://www.facebook.com/business/help/530209463124901",
    label: "Meta: Request a review if you are restricted from advertising",
  },
];

export default function MetaGuidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
        Plain-language guide · checked 7 Oct 2026
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        Meta ad account disabled vs restricted: what&apos;s the difference?
      </h1>

      <div className="mt-6 rounded-3xl border border-amber/40 bg-panel/60 p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Short answer</p>
        <p className="mt-3 text-base leading-relaxed text-foreground sm:text-lg">
          <strong>Restricted</strong> means Meta limited advertising on an asset (your profile, a
          Page, an ad account, or a business portfolio). That can be a spend or payment limit,
          lost features, or no ads at all. <strong>Disabled</strong> is the ad-account outcome:
          the account and its ads are off, Meta says it can&apos;t be switched back on in place,
          and an admin has to request a review in Meta Business Support Home. Neither is the same
          as a closed account or one rejected ad.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber/90"
          >
            Paste your notice into the free checker
          </Link>
          <a
            href="#faq"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5"
          >
            Jump to questions
          </a>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Which one do you have?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Read the exact words in the notice or the banner in Ads Manager. Then match them below.
        </p>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-panel/80 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              <tr>
                <th className="p-3">Status</th>
                <th className="p-3">What it means</th>
                <th className="p-3">Can you run ads?</th>
                <th className="p-3">What to do</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row.state} className="align-top">
                  <td className="p-3 font-semibold text-foreground">{row.state}</td>
                  <td className="p-3 text-muted">{row.means}</td>
                  <td className="p-3 text-muted">{row.ads}</td>
                  <td className="p-3 text-muted">{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          How to request a review (disabled or restricted)
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
          <li>On a computer, open Meta Business Support Home.</li>
          <li>Go to Account overview and select the restricted or disabled account.</li>
          <li>
            Read the What you can do section. Meta may ask you to confirm your identity, complete
            verification, or secure the account first.
          </li>
          <li>If you are an admin, select Request review and finish the on-screen steps.</li>
          <li>
            Keep the original notice and its date. Meta says an ad account that stays ineligible for
            six months can no longer be reinstated.
          </li>
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Don&apos;t open a new ad account, Page, or business portfolio to keep advertising. Meta
          treats that as circumvention.
        </p>
      </section>

      <FaqSection items={META_FAQ} heading="Questions people ask about Meta ad restrictions" />

      <section className="mt-12 rounded-3xl border border-line bg-panel/50 p-5 text-sm leading-relaxed text-muted">
        <h2 className="text-base font-semibold text-foreground">Sources</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} className="underline hover:text-foreground" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          {DISCLAIMER_SHORT} {HONESTY} Not affiliated with Meta. Meta changes its menus and wording;
          trust the notice and Meta&apos;s own help pages over this summary.
        </p>
      </section>
    </div>
  );
}

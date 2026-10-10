import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResultCard } from "@/components/result-card";
import {
  PUBLIC_URL,
  isExample,
  ogPath,
  parseResultParams,
  resultFromInputs,
  resultHeadline,
  resultPath,
} from "@/lib/share";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

type SP = Promise<Record<string, string | string[] | undefined>>;

const levelClass = { HIGH: "text-rose-300", MED: "text-amber", LOW: "text-teal-200" } as const;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const inputs = parseResultParams(await searchParams);
  if (!inputs) return { title: "Your result", robots: { index: false, follow: true } };
  const r = resultFromInputs(inputs);
  const title = resultHeadline(r);
  const description = `${r.headline}. ${r.reasons.map((x) => x.label).join(", ")}. Keyword weight ${r.score}. Shared from the free Ads Risk Check; the link carries no notice text. ${DISCLAIMER_SHORT}`;
  const url = `${PUBLIC_URL}${resultPath(inputs)}`;
  const image = ogPath(inputs);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: isExample(inputs) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `Ads Risk Check · ${title}`,
      description,
      type: "website",
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `Ads Risk Check · ${title}`, description, images: [image] },
  };
}

export default async function ResultPage({ searchParams }: { searchParams: SP }) {
  const inputs = parseResultParams(await searchParams);
  if (!inputs) redirect("/");
  const r = resultFromInputs(inputs);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Shared result · Ads Risk Check</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          <span className={levelClass[r.level]}>{r.level} risk</span>{" "}
          {r.platform === "Unspecified" ? "ads" : r.platform} notice
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Matched phrase groups: {r.reasons.map((x) => x.label).join(", ")}.
        </p>
        <p className="mt-3 text-sm text-muted">
          This card was rebuilt from the phrase groups in the link. The original notice text is not in the link and was never stored.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/" className="text-amber underline underline-offset-2">
            Check your own Google Ads or Meta notice →
          </Link>
        </p>
      </section>
      <section className="max-w-3xl">
        <ResultCard result={r} shared />
      </section>
      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
        {DISCLAIMER_SHORT} {HONESTY}
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { DigestForm } from "@/components/digest-form";
import { SponsorSlot } from "@/components/sponsor-slot";

export const metadata: Metadata = {
  title: "Digest",
  description:
    "Optional email stub for a future Ads Risk Check digest. Without a webhook, the address stays in this browser only.",
};

export default function DigestPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Later, maybe</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
        A digest stub, not a list we own.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Leave an email if you want a future note when the phrase list changes. If{" "}
        <code className="text-foreground">DIGEST_WEBHOOK_URL</code> is an https address, the
        server forwards the JSON there and keeps no copy. If that variable is unset, the server
        stores nothing and this browser keeps the address locally.
      </p>
      <div className="mt-8 rounded-3xl border border-line bg-panel/60 p-5 sm:p-7">
        <DigestForm />
      </div>
      <div className="mt-8">
        <SponsorSlot />
      </div>
    </div>
  );
}

import Link from "next/link";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

const links = [
  { href: "/", label: "Check a notice" },
  { href: "/quiz", label: "Quiz" },
  { href: "/digest", label: "Digest" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted">
        <p className="max-w-3xl leading-relaxed">{DISCLAIMER_SHORT}</p>
        <p className="max-w-3xl leading-relaxed">{HONESTY}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs tracking-wide text-muted/80">
          No payments. No appeal service. Not affiliated with Google or Meta.
        </p>
      </div>
    </footer>
  );
}

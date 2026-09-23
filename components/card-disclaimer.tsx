import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

export function CardDisclaimer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 px-5 py-4 text-xs leading-relaxed text-muted sm:px-7">
      <p>{DISCLAIMER_SHORT}</p>
      <p className="mt-1">{HONESTY}</p>
    </footer>
  );
}

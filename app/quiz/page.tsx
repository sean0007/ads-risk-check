import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz-flow";

export const metadata: Metadata = {
  title: "What got you suspended",
  description:
    "A five-question educational sketch of suspension patterns. Not a reading of a Google or Meta decision, and not an appeal.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Five questions</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
        What got you suspended?
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Answer from the notice and what you did next. You get a shareable archetype. It is a
        sketch of the pattern in your answers, not a diagnosis, and not a promise anyone will
        reinstate the account.
      </p>
      <div className="mt-8">
        <QuizFlow />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArchetypeCard } from "@/components/archetype-card";
import { quizQuestions, scoreQuiz, type Archetype } from "@/lib/quiz";

export function QuizFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  const question = quizQuestions[step];

  function choose(optionId: string) {
    const nextAnswers = [...answers.slice(0, step), optionId];
    setAnswers(nextAnswers);
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
      setArchetype(null);
      return;
    }
    const scored = scoreQuiz(nextAnswers);
    setArchetype(scored?.archetype ?? null);
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setArchetype(null);
  }

  if (archetype) {
    return (
      <div>
        <ArchetypeCard archetype={archetype} />
        <button
          type="button"
          onClick={restart}
          className="mt-4 text-sm text-muted underline decoration-white/20 underline-offset-4 hover:text-foreground"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-panel/70 p-5 sm:p-7">
      <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
        Question {step + 1} of {quizQuestions.length}
      </p>
      <h2 className="mt-3 text-2xl tracking-tight sm:text-3xl">{question.prompt}</h2>
      <div className="mt-5 grid gap-2">
        {question.options.map((option) => {
          const selected = answers[step] === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed hover:border-amber/60 hover:bg-white/5 ${
                selected ? "border-amber bg-amber/10 text-foreground" : "border-white/10 text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {step > 0 ? (
        <button
          type="button"
          onClick={() => {
            setStep(step - 1);
            setArchetype(null);
          }}
          className="mt-4 text-sm text-muted underline decoration-white/20 underline-offset-4 hover:text-foreground"
        >
          Back
        </button>
      ) : null}
    </div>
  );
}

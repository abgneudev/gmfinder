"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import { QUIZ, scoreGMs, type QuizAnswers } from "@/lib/quiz";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const finished = step >= QUIZ.length;
  const question = QUIZ[step];

  const results = useMemo(
    () => (finished ? scoreGMs(answers) : []),
    [finished, answers],
  );

  function choose(optionId: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function retake() {
    setAnswers({});
    setStep(0);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          GMFinder Quiz
        </p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Find your perfect table 🎲
        </h1>
        <p className="mt-2 text-lg text-text-muted">
          Answer a few quick questions and we&apos;ll match you with Game
          Masters you&apos;ll love.
        </p>
      </header>

      {!finished ? (
        <section
          key={question.id}
          className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8"
        >
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-text-faint">
              <span>
                Question{" "}
                <span className="font-mono tabular-nums">{step + 1}</span> of{" "}
                <span className="font-mono tabular-nums">{QUIZ.length}</span>
              </span>
              <span className="font-mono tabular-nums">
                {Math.round((step / QUIZ.length) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(step / QUIZ.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-text">
            {question.prompt}
          </h2>
          <p className="mt-1 text-text-muted">{question.subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((opt) => {
              const active = answers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(opt.id)}
                  className={`flex items-start gap-4 rounded-lg border p-4 text-left transition duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-card-hover ${
                    active
                      ? "border-accent bg-accent-soft ring-2 ring-accent/30"
                      : "border-border bg-surface"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {opt.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-text">
                      {opt.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-text-muted">
                      {opt.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="text-sm font-medium text-text-faint enabled:hover:text-text disabled:opacity-0"
            >
              ← Back
            </button>
            <Link
              href="/"
              className="text-sm font-medium text-text-faint hover:text-text"
            >
              Skip to browse →
            </Link>
          </div>
        </section>
      ) : (
        <section>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Your top {results.length} Game Master
              {results.length === 1 ? "" : "s"} ✨
            </h2>
            <p className="mt-1 text-text-muted">
              Matched to your answers. Tap a card to view the full profile and
              book a session.
            </p>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((gm, i) => (
                <QuizCard key={gm.slug} gm={gm} rank={i} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-surface p-6 text-center text-text-muted">
              No GMs matched your budget. Try retaking the quiz with a higher
              budget.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={retake}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-card transition hover:bg-accent-hover"
            >
              ↻ Retake quiz
            </button>
            <Link
              href="/"
              className="rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text-muted transition hover:border-accent hover:text-text"
            >
              Browse all GMs
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

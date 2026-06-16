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
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          GMFinder Quiz
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-stone-900">
          Find your perfect table 🎲
        </h1>
        <p className="mt-2 text-lg text-stone-600">
          Answer a few quick questions and we&apos;ll match you with Game
          Masters you&apos;ll love.
        </p>
      </header>

      {!finished ? (
        <section
          key={question.id}
          className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
              <span>
                Question {step + 1} of {QUIZ.length}
              </span>
              <span>{Math.round((step / QUIZ.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(step / QUIZ.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-stone-900">
            {question.prompt}
          </h2>
          <p className="mt-1 text-stone-600">{question.subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((opt) => {
              const active = answers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(opt.id)}
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md ${
                    active
                      ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {opt.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-stone-900">
                      {opt.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-stone-600">
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
              className="text-sm font-medium text-stone-500 enabled:hover:text-stone-800 disabled:opacity-0"
            >
              ← Back
            </button>
            <Link
              href="/"
              className="text-sm font-medium text-stone-500 hover:text-stone-800"
            >
              Skip to browse →
            </Link>
          </div>
        </section>
      ) : (
        <section>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-stone-900">
              Your top {results.length} Game Master
              {results.length === 1 ? "" : "s"} ✨
            </h2>
            <p className="mt-1 text-stone-600">
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
            <p className="rounded-2xl border border-stone-200 bg-white p-6 text-center text-stone-600">
              No GMs matched your budget. Try retaking the quiz with a higher
              budget.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={retake}
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              ↻ Retake quiz
            </button>
            <Link
              href="/"
              className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
            >
              Browse all GMs
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

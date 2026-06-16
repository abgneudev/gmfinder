import Link from "next/link";
import { notFound } from "next/navigation";
import { GAME_MASTERS, getGM } from "@/data/gms";

export function generateStaticParams() {
  return GAME_MASTERS.map((gm) => ({ slug: gm.slug }));
}

export default async function GMDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gm = getGM(slug);
  if (!gm) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Back to all GMs
      </Link>

      <header className="mt-6 flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-4xl">
          {gm.avatar}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            {gm.name}
          </h1>
          <p className="mt-1 text-lg text-stone-600">{gm.tagline}</p>
          <p className="mt-2 text-sm text-amber-800">
            ⭐ {gm.rating.toFixed(1)} · {gm.reviews} reviews ·{" "}
            <span className="font-semibold text-stone-900">
              ${gm.pricePerSession}
            </span>
            /session
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Systems
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gm.systems.map((s) => (
              <span
                key={s}
                className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-sm font-medium text-indigo-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Style
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gm.styles.map((s) => (
              <span
                key={s}
                className="rounded-full bg-stone-100 px-2.5 py-0.5 text-sm text-stone-600"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Available sessions
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {gm.schedule.map((slot) => (
            <li
              key={slot}
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700"
            >
              {slot}
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        className="mt-8 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
      >
        Request a seat at {gm.name.split(" ")[0]}&apos;s table
      </button>
    </main>
  );
}

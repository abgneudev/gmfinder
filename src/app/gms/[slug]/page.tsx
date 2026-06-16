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
        className="text-sm font-medium text-accent hover:text-accent-hover"
      >
        ← Back to all GMs
      </Link>

      <header className="mt-6 flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-4xl">
          {gm.avatar}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {gm.name}
          </h1>
          <p className="mt-1 text-lg text-text-muted">{gm.tagline}</p>
          <p className="mt-2 font-mono text-sm tabular-nums text-text-muted">
            <span className="text-gold">⭐ {gm.rating.toFixed(1)}</span> ·{" "}
            {gm.reviews} reviews ·{" "}
            <span className="font-semibold text-text">
              ${gm.pricePerSession}
            </span>
            /session
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-faint">
            Systems
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gm.systems.map((s) => (
              <span
                key={s}
                className="rounded-sm bg-accent-soft px-2.5 py-0.5 text-sm font-medium text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-faint">
            Style
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gm.styles.map((s) => (
              <span
                key={s}
                className="rounded-sm bg-surface-2 px-2.5 py-0.5 text-sm text-text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-faint">
          Available sessions
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {gm.schedule.map((slot) => (
            <li
              key={slot}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-muted"
            >
              {slot}
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        className="mt-8 w-full rounded-md bg-accent px-5 py-3 font-semibold text-accent-contrast transition hover:bg-accent-hover sm:w-auto"
      >
        Request a seat at {gm.name.split(" ")[0]}&apos;s table
      </button>
    </main>
  );
}

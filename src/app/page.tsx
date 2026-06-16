import Link from "next/link";
import { GAME_MASTERS } from "@/data/gms";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">GMFinder</h1>
        <p className="mt-2 text-lg text-gray-600">
          Book professional Game Masters for tabletop RPGs.
        </p>
        <nav className="mt-4 flex gap-4 text-sm text-indigo-600">
          <Link href="/gms">Browse GMs</Link>
          <Link href="/quiz">Find my game</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAME_MASTERS.slice(0, 6).map((gm) => (
          <Link
            key={gm.slug}
            href={`/gms/${gm.slug}`}
            className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
          >
            <div className="text-3xl">{gm.avatar}</div>
            <h2 className="mt-2 font-semibold">{gm.name}</h2>
            <p className="text-sm text-gray-600">{gm.tagline}</p>
            <p className="mt-2 text-sm">
              ⭐ {gm.rating} · ${gm.pricePerSession}/session
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}

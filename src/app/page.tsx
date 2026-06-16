import Browse from "@/components/Browse";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="relative mb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 left-0 -z-10 h-64 w-full bg-[radial-gradient(60%_60%_at_20%_0%,var(--accent-soft),transparent_70%)]"
        />
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Find your <span className="text-accent">Game Master</span> 🎲
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-text-muted">
          Browse professional GMs, filter by system, style, and day, and find a
          table you&apos;ll actually love. No account needed to look around.
        </p>
      </header>

      <Browse />
    </main>
  );
}

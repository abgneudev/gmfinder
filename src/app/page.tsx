import Browse from "@/components/Browse";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">
          Find your <span className="text-indigo-600">Game Master</span> 🎲
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-stone-600">
          Browse professional GMs, filter by system, style, and day, and find a
          table you&apos;ll actually love. No account needed to look around.
        </p>
      </header>

      <Browse />
    </main>
  );
}

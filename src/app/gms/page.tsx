import Browse from "@/components/Browse";

export const metadata = {
  title: "Browse Game Masters · GMFinder",
};

export default function GmsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Browse Game Masters
        </h1>
        <p className="mt-2 text-text-muted">
          Filter by system, style, and day to find your table.
        </p>
      </header>

      <Browse />
    </main>
  );
}

import EventCard from "@/components/EventCard";
import { EVENTS } from "@/data/events";
import { sortByDate } from "@/lib/events";

export const metadata = {
  title: "Upcoming Sessions · GMFinder",
};

export default function EventsPage() {
  const events = sortByDate(EVENTS);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Upcoming Sessions
        </h1>
        <p className="mt-2 text-stone-600">
          Dated, joinable games hosted by our Game Masters — grab a seat.
        </p>
      </header>

      {events.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
          No sessions scheduled right now. Check back soon!
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}

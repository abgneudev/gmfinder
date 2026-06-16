import Link from "next/link";
import type { GameEvent } from "@/data/events";
import { getEventGM, seatStatus, type SeatStatus } from "@/lib/events";

// Sessions run on US Eastern time; format explicitly so server output is stable.
const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
  timeZoneName: "short",
});

const SEAT_BADGE: Record<SeatStatus, { label: string; className: string }> = {
  open: {
    label: "Seats open",
    className: "bg-emerald-50 text-emerald-700",
  },
  filling: {
    label: "Filling fast",
    className: "bg-amber-50 text-amber-800",
  },
  "sold-out": {
    label: "Sold out",
    className: "bg-stone-100 text-stone-500",
  },
};

export default function EventCard({ event }: { event: GameEvent }) {
  const gm = getEventGM(event);
  const status = seatStatus(event);
  const badge = SEAT_BADGE[status];

  return (
    <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
          {event.type}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <h2 className="mt-3 font-semibold text-stone-900">{event.title}</h2>

      {gm ? (
        <Link
          href={`/gms/${gm.slug}`}
          className="mt-2 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-indigo-700"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-base">
            {gm.avatar}
          </span>
          {gm.name}
        </Link>
      ) : (
        <span className="mt-2 text-sm text-stone-400">Host TBA</span>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {event.system}
        </span>
        <span className="text-xs text-stone-500">
          {event.durationHrs} hr session
        </span>
      </div>

      <p className="mt-3 text-sm text-stone-600">
        {dateFmt.format(new Date(event.date))}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-sm">
        <span className="font-semibold text-stone-900">
          ${event.price}
          <span className="font-normal text-stone-500">/seat</span>
        </span>
        {status === "sold-out" ? (
          <span className="cursor-not-allowed rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-400">
            Sold out
          </span>
        ) : (
          <Link
            href={gm ? `/gms/${gm.slug}` : "#"}
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Join
          </Link>
        )}
      </div>
    </article>
  );
}

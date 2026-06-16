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
    className: "bg-success-soft text-success",
  },
  filling: {
    label: "Filling fast",
    className: "bg-gold-soft text-gold",
  },
  "sold-out": {
    label: "Sold out",
    className: "bg-surface-2 text-text-faint",
  },
};

export default function EventCard({ event }: { event: GameEvent }) {
  const gm = getEventGM(event);
  const status = seatStatus(event);
  const badge = SEAT_BADGE[status];

  return (
    <article
      data-testid="event-card"
      className="flex flex-col rounded-lg border border-border bg-surface p-5 shadow-card transition duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-muted">
          {event.type}
        </span>
        <span
          className={`rounded-sm px-2.5 py-1 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <h2 className="mt-3 font-semibold text-text">{event.title}</h2>

      {gm ? (
        <Link
          href={`/gms/${gm.slug}`}
          className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-base">
            {gm.avatar}
          </span>
          {gm.name}
        </Link>
      ) : (
        <span className="mt-2 text-sm text-text-faint">Host TBA</span>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
          {event.system}
        </span>
        <span className="text-xs text-text-faint">
          <span className="font-mono tabular-nums">{event.durationHrs}</span> hr
          session
        </span>
      </div>

      <p className="mt-3 font-mono text-sm tabular-nums text-text-muted">
        {dateFmt.format(new Date(event.date))}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="font-mono font-semibold tabular-nums text-text">
          ${event.price}
          <span className="font-sans font-normal text-text-faint">/seat</span>
        </span>
        {status === "sold-out" ? (
          <span className="cursor-not-allowed rounded-full bg-surface-2 px-4 py-1.5 text-sm font-medium text-text-faint">
            Sold out
          </span>
        ) : (
          <Link
            href={gm ? `/gms/${gm.slug}` : "#"}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-contrast transition hover:bg-accent-hover"
          >
            Join
          </Link>
        )}
      </div>
    </article>
  );
}

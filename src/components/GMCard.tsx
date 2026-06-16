import Link from "next/link";
import type { GM } from "@/data/gms";

export default function GMCard({ gm }: { gm: GM }) {
  return (
    <Link
      href={`/gms/${gm.slug}`}
      data-testid="gm-card"
      className="group flex flex-col rounded-lg border border-border bg-surface p-5 shadow-card transition duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-2xl">
          {gm.avatar}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-1 text-sm font-medium text-gold">
          ⭐{" "}
          <span className="font-mono tabular-nums">{gm.rating.toFixed(1)}</span>
          <span className="font-mono tabular-nums text-gold/80">
            ({gm.reviews})
          </span>
        </span>
      </div>

      <h2 className="mt-3 font-semibold text-text group-hover:text-accent">
        {gm.name}
      </h2>
      <p className="mt-1 text-sm text-text-muted">{gm.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {gm.systems.map((s) => (
          <span
            key={s}
            className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent"
          >
            {s}
          </span>
        ))}
        {gm.styles.map((s) => (
          <span
            key={s}
            className="rounded-sm bg-surface-2 px-2 py-0.5 text-xs text-text-muted"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-text-faint">{gm.schedule.join(" · ")}</span>
        <span className="font-mono font-semibold tabular-nums text-text">
          ${gm.pricePerSession}
          <span className="font-sans font-normal text-text-faint">
            /session
          </span>
        </span>
      </div>
    </Link>
  );
}

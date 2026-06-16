import Link from "next/link";
import type { GM } from "@/data/gms";

export default function GMCard({ gm }: { gm: GM }) {
  return (
    <Link
      href={`/gms/${gm.slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
          {gm.avatar}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-800">
          ⭐ {gm.rating.toFixed(1)}
          <span className="text-amber-500/80">({gm.reviews})</span>
        </span>
      </div>

      <h2 className="mt-3 font-semibold text-stone-900 group-hover:text-indigo-700">
        {gm.name}
      </h2>
      <p className="mt-1 text-sm text-stone-600">{gm.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {gm.systems.map((s) => (
          <span
            key={s}
            className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700"
          >
            {s}
          </span>
        ))}
        {gm.styles.map((s) => (
          <span
            key={s}
            className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-sm">
        <span className="text-stone-500">{gm.schedule.join(" · ")}</span>
        <span className="font-semibold text-stone-900">
          ${gm.pricePerSession}
          <span className="font-normal text-stone-500">/session</span>
        </span>
      </div>
    </Link>
  );
}

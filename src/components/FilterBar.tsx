"use client";

import type { FilterCriteria } from "@/lib/filter";

type Facets = {
  systems: string[];
  styles: string[];
  days: string[];
};

type Props = {
  criteria: FilterCriteria;
  facets: Facets;
  onChange: (next: FilterCriteria) => void;
  onReset: () => void;
};

function toggle(list: string[] | undefined, value: string): string[] {
  const set = new Set(list ?? []);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[] | undefined;
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected?.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(opt)}
              className={
                "rounded-full border px-3 py-1 text-sm transition " +
                (active
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-indigo-400 hover:text-indigo-700")
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterBar({
  criteria,
  facets,
  onChange,
  onReset,
}: Props) {
  const hasFilters =
    !!criteria.query ||
    !!criteria.systems?.length ||
    !!criteria.styles?.length ||
    !!criteria.days?.length;

  return (
    <aside className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={criteria.query ?? ""}
          onChange={(e) => onChange({ ...criteria, query: e.target.value })}
          placeholder="Search by name or vibe…"
          className="w-full flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <select
          value={criteria.sort ?? ""}
          onChange={(e) =>
            onChange({
              ...criteria,
              sort: (e.target.value || undefined) as FilterCriteria["sort"],
            })
          }
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700 outline-none focus:border-indigo-500"
        >
          <option value="">Sort: Featured</option>
          <option value="rating">Highest rated</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <ChipGroup
          label="System"
          options={facets.systems}
          selected={criteria.systems}
          onToggle={(v) =>
            onChange({ ...criteria, systems: toggle(criteria.systems, v) })
          }
        />
        <ChipGroup
          label="Style"
          options={facets.styles}
          selected={criteria.styles}
          onToggle={(v) =>
            onChange({ ...criteria, styles: toggle(criteria.styles, v) })
          }
        />
        <ChipGroup
          label="Day"
          options={facets.days}
          selected={criteria.days}
          onToggle={(v) =>
            onChange({ ...criteria, days: toggle(criteria.days, v) })
          }
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

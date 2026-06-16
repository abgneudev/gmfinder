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
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-faint">
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
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-border-strong bg-transparent text-text-muted hover:border-accent hover:text-text")
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
    <aside className="space-y-5 rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={criteria.query ?? ""}
          onChange={(e) => onChange({ ...criteria, query: e.target.value })}
          placeholder="Search by name or vibe…"
          className="w-full flex-1 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-text placeholder:text-text-faint outline-none focus:border-accent"
        />
        <select
          value={criteria.sort ?? ""}
          onChange={(e) =>
            onChange({
              ...criteria,
              sort: (e.target.value || undefined) as FilterCriteria["sort"],
            })
          }
          className="rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-text outline-none focus:border-accent"
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
          className="text-sm font-medium text-accent hover:text-accent-hover"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  GAME_MASTERS,
  ALL_SYSTEMS,
  ALL_STYLES,
  ALL_SCHEDULES,
} from "@/data/gms";
import { filterGMs, type FilterCriteria } from "@/lib/filter";
import FilterBar from "@/components/FilterBar";
import GMCard from "@/components/GMCard";

export default function Browse() {
  const [criteria, setCriteria] = useState<FilterCriteria>({});

  const results = useMemo(() => filterGMs(GAME_MASTERS, criteria), [criteria]);

  return (
    <div className="space-y-6">
      <FilterBar
        criteria={criteria}
        facets={{
          systems: ALL_SYSTEMS,
          styles: ALL_STYLES,
          days: ALL_SCHEDULES,
        }}
        onChange={setCriteria}
        onReset={() => setCriteria({})}
      />

      <p
        data-testid="result-count"
        className="text-sm font-medium text-text-muted"
      >
        {results.length} {results.length === 1 ? "Game Master" : "Game Masters"}
      </p>

      {results.length === 0 ? (
        <div
          data-testid="empty-state"
          className="rounded-xl border border-dashed border-border bg-surface/60 p-12 text-center"
        >
          <p className="text-3xl">🎲</p>
          <p className="mt-3 font-semibold text-text">
            No GMs match your filters
          </p>
          <p className="mt-1 text-sm text-text-faint">
            Try removing a filter to see more tables.
          </p>
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((gm) => (
            <GMCard key={gm.slug} gm={gm} />
          ))}
        </section>
      )}
    </div>
  );
}

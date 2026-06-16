import type { GM } from "@/data/gms";

export type FilterCriteria = {
  systems?: string[]; // OR within facet
  styles?: string[]; // OR within facet
  days?: string[]; // OR; matches if any GM slot starts with the day token
  query?: string; // free text over name + tagline, case-insensitive
  sort?: "rating" | "priceAsc" | "priceDesc";
};

const dayOf = (slot: string) => slot.split(" ")[0];

/**
 * AND across facets, OR within a facet. Empty/undefined facet = no constraint.
 * Pure: no React, no I/O. Returns a new array; never mutates input.
 */
export function filterGMs(gms: GM[], c: FilterCriteria): GM[] {
  const q = c.query?.trim().toLowerCase();

  const out = gms.filter((gm) => {
    if (c.systems?.length && !c.systems.some((s) => gm.systems.includes(s)))
      return false;
    if (c.styles?.length && !c.styles.some((s) => gm.styles.includes(s)))
      return false;
    if (
      c.days?.length &&
      !c.days.some((d) => gm.schedule.some((slot) => dayOf(slot) === d))
    )
      return false;
    if (q && !`${gm.name} ${gm.tagline}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  switch (c.sort) {
    case "rating":
      return out.sort((a, b) => b.rating - a.rating);
    case "priceAsc":
      return out.sort((a, b) => a.pricePerSession - b.pricePerSession);
    case "priceDesc":
      return out.sort((a, b) => b.pricePerSession - a.pricePerSession);
    default:
      return out;
  }
}

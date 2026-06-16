import type { GameEvent } from "@/data/events";
import { getGM, type GM } from "@/data/gms";

export type SeatStatus = "open" | "filling" | "sold-out";

/**
 * Chronological order (soonest first). Pure: returns a new array, never mutates.
 */
export function sortByDate(events: GameEvent[]): GameEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

/**
 * Seat availability bucket. "filling" once two or fewer seats remain.
 */
export function seatStatus(e: GameEvent): SeatStatus {
  if (e.seatsLeft <= 0) return "sold-out";
  if (e.seatsLeft <= 2) return "filling";
  return "open";
}

/**
 * Resolve the GM hosting an event. Thin wrapper over getGM keyed on gmSlug.
 */
export function getEventGM(e: GameEvent): GM | undefined {
  return getGM(e.gmSlug);
}

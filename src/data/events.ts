// Dated, joinable game sessions hosted by GMs — distinct from GM profiles.
// Pure data. Business logic lives in src/lib/events.ts.

export type EventType = "One-shot" | "Campaign session" | "Beginner workshop";

export type GameEvent = {
  id: string;
  title: string;
  gmSlug: string; // references a slug in src/data/gms.ts
  system: string;
  date: string; // ISO 8601 with offset; sessions run on US Eastern time
  durationHrs: number;
  seatsTotal: number;
  seatsLeft: number;
  price: number; // USD per seat
  type: EventType;
};

// Intentionally unsorted by date so sortByDate() is observable.
export const EVENTS: GameEvent[] = [
  {
    id: "evt-curse-of-the-hollow-king",
    title: "Curse of the Hollow King",
    gmSlug: "thorne-blackwood",
    system: "D&D 5e",
    date: "2026-07-11T14:00:00-04:00",
    durationHrs: 4,
    seatsTotal: 6,
    seatsLeft: 4,
    price: 25,
    type: "Campaign session",
  },
  {
    id: "evt-first-steps-into-the-mist",
    title: "First Steps into the Mist",
    gmSlug: "lyra-meadowlight",
    system: "D&D 5e",
    date: "2026-06-22T18:00:00-04:00",
    durationHrs: 3,
    seatsTotal: 5,
    seatsLeft: 5,
    price: 20,
    type: "Beginner workshop",
  },
  {
    id: "evt-the-bone-deep-delve",
    title: "The Bone-Deep Delve",
    gmSlug: "garrick-stone",
    system: "Pathfinder 2e",
    date: "2026-06-28T16:00:00-04:00",
    durationHrs: 5,
    seatsTotal: 5,
    seatsLeft: 1,
    price: 30,
    type: "One-shot",
  },
  {
    id: "evt-derelict-on-the-edge",
    title: "Derelict on the Edge of Nowhere",
    gmSlug: "nova-ashford",
    system: "Starfinder",
    date: "2026-07-03T20:00:00-04:00",
    durationHrs: 4,
    seatsTotal: 6,
    seatsLeft: 2,
    price: 22,
    type: "One-shot",
  },
  {
    id: "evt-tea-and-tiny-quests",
    title: "Tea & Tiny Quests",
    gmSlug: "wren-fairweather",
    system: "Honey Heist",
    date: "2026-06-20T11:00:00-04:00",
    durationHrs: 2,
    seatsTotal: 4,
    seatsLeft: 3,
    price: 18,
    type: "Beginner workshop",
  },
  {
    id: "evt-the-lighthouse-keeper",
    title: "The Lighthouse Keeper's Last Night",
    gmSlug: "dario-vex",
    system: "Call of Cthulhu",
    date: "2026-07-24T22:00:00-04:00",
    durationHrs: 3,
    seatsTotal: 5,
    seatsLeft: 0,
    price: 28,
    type: "One-shot",
  },
  {
    id: "evt-court-of-thorned-crowns",
    title: "Court of Thorned Crowns",
    gmSlug: "isolde-rune",
    system: "Pathfinder 2e",
    date: "2026-07-15T19:00:00-04:00",
    durationHrs: 4,
    seatsTotal: 6,
    seatsLeft: 5,
    price: 26,
    type: "Campaign session",
  },
  {
    id: "evt-pizza-and-pixels",
    title: "Pizza & Pixels: Mech Brawl",
    gmSlug: "kai-emberforge",
    system: "Lancer",
    date: "2026-07-08T19:00:00-04:00",
    durationHrs: 3,
    seatsTotal: 6,
    seatsLeft: 2,
    price: 20,
    type: "One-shot",
  },
];

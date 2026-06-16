export type GM = {
  slug: string;
  name: string;
  tagline: string;
  systems: string[]; // e.g. "D&D 5e", "Pathfinder 2e"
  styles: string[]; // e.g. "Roleplay-heavy", "Combat", "Beginner-friendly"
  pricePerSession: number; // USD
  rating: number;
  reviews: number;
  schedule: string[]; // human-readable slots
  avatar: string; // emoji placeholder for the hour
};

export const GAME_MASTERS: GM[] = [
  {
    slug: "thorne-blackwood",
    name: "Thorne Blackwood",
    tagline: "Epic homebrew campaigns with cinematic combat.",
    systems: ["D&D 5e", "Pathfinder 2e"],
    styles: ["Combat", "Homebrew"],
    pricePerSession: 25,
    rating: 4.9,
    reviews: 212,
    schedule: ["Tue 7pm ET", "Sat 2pm ET"],
    avatar: "🗡️",
  },
  {
    slug: "lyra-meadowlight",
    name: "Lyra Meadowlight",
    tagline: "Story-first tables. Great for first-timers.",
    systems: ["D&D 5e", "Call of Cthulhu"],
    styles: ["Roleplay-heavy", "Beginner-friendly"],
    pricePerSession: 20,
    rating: 5.0,
    reviews: 318,
    schedule: ["Mon 6pm ET", "Thu 8pm ET"],
    avatar: "🌙",
  },
  {
    slug: "garrick-stone",
    name: "Garrick Stone",
    tagline: "Gritty, deadly dungeon crawls. No hand-holding.",
    systems: ["Pathfinder 2e", "Old-School Essentials"],
    styles: ["Combat", "Hardcore"],
    pricePerSession: 30,
    rating: 4.7,
    reviews: 96,
    schedule: ["Wed 9pm ET", "Sun 4pm ET"],
    avatar: "⚒️",
  },
  {
    slug: "nova-ashford",
    name: "Nova Ashford",
    tagline: "Sci-fi sandboxes among the stars.",
    systems: ["Starfinder", "Stars Without Number"],
    styles: ["Exploration", "Homebrew"],
    pricePerSession: 22,
    rating: 4.8,
    reviews: 141,
    schedule: ["Fri 8pm ET"],
    avatar: "🚀",
  },
  {
    slug: "wren-fairweather",
    name: "Wren Fairweather",
    tagline: "Cozy, low-stakes adventures for busy adults.",
    systems: ["D&D 5e", "Honey Heist"],
    styles: ["Roleplay-heavy", "Beginner-friendly", "Cozy"],
    pricePerSession: 18,
    rating: 4.9,
    reviews: 274,
    schedule: ["Sat 11am ET", "Sun 1pm ET"],
    avatar: "🍯",
  },
  {
    slug: "dario-vex",
    name: "Dario Vex",
    tagline: "Horror one-shots that will keep you up at night.",
    systems: ["Call of Cthulhu", "Mörk Borg"],
    styles: ["Horror", "One-shot"],
    pricePerSession: 28,
    rating: 4.6,
    reviews: 88,
    schedule: ["Fri 10pm ET"],
    avatar: "🕯️",
  },
  {
    slug: "isolde-rune",
    name: "Isolde Rune",
    tagline: "High-fantasy political intrigue and deep lore.",
    systems: ["Pathfinder 2e", "D&D 5e"],
    styles: ["Roleplay-heavy", "Intrigue"],
    pricePerSession: 26,
    rating: 4.9,
    reviews: 167,
    schedule: ["Mon 8pm ET", "Wed 7pm ET"],
    avatar: "👑",
  },
  {
    slug: "kai-emberforge",
    name: "Kai Emberforge",
    tagline: "Fast, punchy combat one-shots. Pizza optional.",
    systems: ["D&D 5e", "Lancer"],
    styles: ["Combat", "One-shot", "Beginner-friendly"],
    pricePerSession: 20,
    rating: 4.8,
    reviews: 203,
    schedule: ["Thu 7pm ET", "Sat 6pm ET"],
    avatar: "🔥",
  },
];

// Derived facets for categorization / filtering.
export const ALL_SYSTEMS = Array.from(
  new Set(GAME_MASTERS.flatMap((g) => g.systems)),
).sort();

export const ALL_STYLES = Array.from(
  new Set(GAME_MASTERS.flatMap((g) => g.styles)),
).sort();

// Day-of-week token is the first word of a slot, e.g. "Tue 7pm ET" -> "Tue".
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const ALL_SCHEDULES = Array.from(
  new Set(GAME_MASTERS.flatMap((g) => g.schedule.map((s) => s.split(" ")[0]))),
).sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

export function getGM(slug: string): GM | undefined {
  return GAME_MASTERS.find((g) => g.slug === slug);
}

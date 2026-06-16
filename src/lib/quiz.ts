import { GAME_MASTERS, type GM } from "@/data/gms";

// ---------------------------------------------------------------------------
// Types — the quiz is declarative data so scoring stays a pure function.
// ---------------------------------------------------------------------------

export type QuizOption = {
  id: string;
  label: string;
  emoji: string;
  blurb: string;
  /** Styles (from GM.styles) this answer favors. */
  styles?: string[];
  /** Systems (from GM.systems) this answer favors. */
  systems?: string[];
  /** Signals the player wants a beginner-friendly table. */
  beginner?: boolean;
  /** Caps the recommended price per session (USD). */
  maxPrice?: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  subtitle: string;
  options: QuizOption[];
};

/** Map of questionId -> selected optionId. */
export type QuizAnswers = Record<string, string>;

// ---------------------------------------------------------------------------
// Question definitions
// ---------------------------------------------------------------------------

export const QUIZ: QuizQuestion[] = [
  {
    id: "experience",
    prompt: "How long have you been rolling dice?",
    subtitle: "No wrong answer — every table starts somewhere.",
    options: [
      {
        id: "new",
        label: "Brand new",
        emoji: "🌱",
        blurb: "This is my first campaign.",
        beginner: true,
      },
      {
        id: "veteran",
        label: "Seasoned adventurer",
        emoji: "🎲",
        blurb: "I know my way around a character sheet.",
      },
    ],
  },
  {
    id: "vibe",
    prompt: "What's the vibe you're chasing?",
    subtitle: "Pick the night that sounds the most fun.",
    options: [
      {
        id: "combat",
        label: "Epic combat",
        emoji: "⚔️",
        blurb: "Tactics, crits, and big boss fights.",
        styles: ["Combat"],
      },
      {
        id: "story",
        label: "Roleplay & story",
        emoji: "🎭",
        blurb: "Deep characters and dramatic choices.",
        styles: ["Roleplay-heavy", "Intrigue"],
      },
      {
        id: "cozy",
        label: "Cozy & casual",
        emoji: "🍵",
        blurb: "Low stakes, good company, lots of laughs.",
        styles: ["Cozy", "Beginner-friendly"],
        beginner: true,
      },
      {
        id: "horror",
        label: "Spine-tingling horror",
        emoji: "🕯️",
        blurb: "Dread, mystery, and things in the dark.",
        styles: ["Horror"],
      },
    ],
  },
  {
    id: "world",
    prompt: "Which world calls to you?",
    subtitle: "Where do you want your adventure to live?",
    options: [
      {
        id: "fantasy",
        label: "High fantasy",
        emoji: "🐉",
        blurb: "Dragons, dungeons, and D&D / Pathfinder.",
        systems: ["D&D 5e", "Pathfinder 2e", "Old-School Essentials"],
      },
      {
        id: "scifi",
        label: "Among the stars",
        emoji: "🚀",
        blurb: "Sci-fi sandboxes and starship crews.",
        systems: ["Starfinder", "Stars Without Number", "Lancer"],
      },
      {
        id: "cosmic",
        label: "Cosmic horror",
        emoji: "🐙",
        blurb: "Call of Cthulhu and forbidden knowledge.",
        systems: ["Call of Cthulhu", "Mörk Borg"],
      },
    ],
  },
  {
    id: "budget",
    prompt: "What's your budget per session?",
    subtitle: "We'll only recommend GMs that fit.",
    options: [
      {
        id: "any",
        label: "Treat myself",
        emoji: "💎",
        blurb: "Price isn't the deciding factor.",
      },
      {
        id: "thrifty",
        label: "Under $25",
        emoji: "💰",
        blurb: "Keep it wallet-friendly.",
        maxPrice: 24,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Scoring — pure function, no React. Returns the top 3 GMs for the answers.
// ---------------------------------------------------------------------------

const STYLE_POINTS = 3;
const SYSTEM_POINTS = 3;
const BEGINNER_BONUS = 4;

/**
 * Score every GM against the selected answers and return the best 3.
 *
 * - +3 per matching style, +3 per matching system
 * - +4 if the player wants a beginner-friendly table and the GM offers one
 * - + the GM's rating, as a gentle tie-breaker toward beloved GMs
 * - GMs over the chosen budget are filtered out entirely
 *
 * Rating is always added, so there is always a sensible ranking even before
 * any questions are answered; matching answers then visibly reshuffle it.
 */
export function scoreGMs(answers: QuizAnswers): GM[] {
  const selected = QUIZ.map((q) =>
    q.options.find((o) => o.id === answers[q.id]),
  ).filter((o): o is QuizOption => Boolean(o));

  const wantStyles = new Set<string>();
  const wantSystems = new Set<string>();
  let wantBeginner = false;
  let maxPrice = Infinity;

  for (const opt of selected) {
    opt.styles?.forEach((s) => wantStyles.add(s));
    opt.systems?.forEach((s) => wantSystems.add(s));
    if (opt.beginner) wantBeginner = true;
    if (opt.maxPrice != null) maxPrice = Math.min(maxPrice, opt.maxPrice);
  }

  return GAME_MASTERS.filter((gm) => gm.pricePerSession <= maxPrice)
    .map((gm) => {
      let score = 0;
      for (const s of gm.styles) if (wantStyles.has(s)) score += STYLE_POINTS;
      for (const s of gm.systems)
        if (wantSystems.has(s)) score += SYSTEM_POINTS;
      if (wantBeginner && gm.styles.includes("Beginner-friendly"))
        score += BEGINNER_BONUS;
      score += gm.rating;
      return { gm, score };
    })
    .sort((a, b) => b.score - a.score || b.gm.rating - a.gm.rating)
    .slice(0, 3)
    .map((entry) => entry.gm);
}

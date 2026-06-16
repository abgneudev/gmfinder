# DESIGN.md — GMFinder Design System

**Purpose:** a single, prescriptive source of truth for the visual language of GMFinder. It exists so that a parallel agent (or any contributor) can restyle the whole app **mechanically and consistently** using scalable, reusable design tokens — no one-off hex values, no drifting greys.

> **TL;DR for the implementing agent**
>
> 1. Replace the `@theme` block in `src/app/globals.css` with the [token block below](#5-the-tokens-paste-into-globalscss).
> 2. Wire the display font in `src/app/layout.tsx` ([§4](#4-typography)).
> 3. Restyle each component using the [class-mapping table](#7-migration-map-old--new) and [component recipes](#8-component-recipes).
> 4. **Only use token utilities** (`bg-surface`, `text-accent`, `rounded-card`…). Never `stone-*`, `indigo-*`, `amber-*`, or raw `[#hex]`.
> 5. Preserve every `data-testid`, `aria-*`, role, and href. Then `npm test` + `npm run build` must pass.

---

## 1. North star & inspiration

GMFinder is an **e-commerce marketplace for tabletop RPG Game Masters**. The user is a player/gamer. The design should feel _native to people who live in gaming storefronts and tools_ — not a generic SaaS table.

What the leaders do (the patterns we adopt):

| Source                               | What we borrow                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Steam / Epic / GOG**               | Dark-first catalog, dense card grids, price + rating as first-class "stats", hover that lifts and highlights a card.                        |
| **Discord / Linear**                 | Near-void dark canvas, one confident accent color rationed to primary actions, hairline borders over heavy fills, tight typographic rhythm. |
| **Framer marketplace**               | Rounded charcoal cards (15–20px radius), soft shadow + subtle accent **glow** on hover, gradient atmosphere accents used sparingly.         |
| **StartPlaying (direct competitor)** | Warm, inviting, "there's a table for me" tone; fantasy flavor without clip-art kitsch; GM cards as the hero unit.                           |
| **Airbnb**                           | Marketplace browse gold standard: filter chips, instant result count, generous card spacing, friendly empty states.                         |

**The GMFinder direction: "Arcane Marketplace."** A dark, modern storefront with an **arcane-violet** primary accent (reads as both _magic_ and _premium software_) and a **gold/ember** secondary for ratings and highlights (the "loot" color). Numbers (price, rating, review count) are rendered in a **monospace** for a tactile "stat block" feel. Fantasy is in the _accent and copy_, not in skeuomorphic parchment.

> **Default theme is DARK.** A light theme is defined for completeness (§5) but dark is the shipped default and the one to optimize.

---

## 2. Design principles

1. **Tokens, not values.** Every color/radius/shadow/font comes from a named token. If you're typing a hex into a component, stop — add or reuse a token.
2. **Semantic over literal.** Components reference _roles_ (`surface`, `border`, `accent`, `text-muted`), never raw palette steps. Re-theming = editing tokens in one file.
3. **One accent, rationed.** Arcane-violet marks _the_ primary action / active state on a screen. Overuse kills its meaning.
4. **Depth through layering, not noise.** Elevation = surface tone step + hairline border + soft shadow. On hover, add a quiet accent glow. No heavy drop shadows, no borders thicker than 1px.
5. **Numbers are stats.** Price, rating, reviews use the mono font + tabular figures so a grid of cards lines up like a stat block.
6. **Motion is a confirmation, not a show.** 150–250ms ease-out on color/transform/shadow. Cards lift ~2px on hover. Nothing bounces.
7. **Accessible by construction.** Body text ≥ 4.5:1, large text ≥ 3:1 against its surface. Visible focus ring on every interactive element.

---

## 3. Color strategy

Two layers:

- **Raw palette** — the actual values, defined as CSS custom properties in `:root` (dark) and `.light` / media-query (light). Never referenced directly by components.
- **Semantic tokens** — what components use, mapped from raw values inside `@theme inline` so they become Tailwind utilities.

Semantic roles:

| Token             | Role                                          | Dark value               | Light value             |
| ----------------- | --------------------------------------------- | ------------------------ | ----------------------- |
| `bg`              | App canvas (the void behind everything)       | `#0b0c11`                | `#faf8f5`               |
| `surface`         | Card / panel fill                             | `#14161d`                | `#ffffff`               |
| `surface-2`       | Elevated / hover / inset fill                 | `#1b1e27`                | `#f4f2ee`               |
| `border`          | Hairline divider/border                       | `#262a36`                | `#e7e3dc`               |
| `border-strong`   | Input border, emphasis                        | `#363c4b`                | `#d6d1c8`               |
| `text`            | Primary text                                  | `#f4f5f7`                | `#1c1917`               |
| `text-muted`      | Secondary text                                | `#a8aebc`                | `#57534e`               |
| `text-faint`      | Tertiary / meta text                          | `#6f7686`                | `#8a8580`               |
| `accent`          | Primary action / active state (arcane violet) | `#7c6cff`                | `#5b4bdd`               |
| `accent-hover`    | Accent hover                                  | `#9385ff`                | `#4a3ad0`               |
| `accent-soft`     | Accent tint background (tags, avatars)        | `rgba(124,108,255,0.15)` | `rgba(91,75,221,0.10)`  |
| `accent-contrast` | Text/icon on accent fill                      | `#ffffff`                | `#ffffff`               |
| `gold`            | Ratings, highlights, "loot"                   | `#ffb547`                | `#b8791b`               |
| `gold-soft`       | Gold tint background                          | `rgba(255,181,71,0.15)`  | `rgba(184,121,27,0.12)` |

> Keep raw greys on a **cool, slightly blue-violet** axis in dark (not pure neutral, not warm) so the violet accent feels integrated. Light theme stays warm (the current "tavern" off-white) for those who prefer it.

---

## 4. Typography

Three families, each with a job:

| Token          | Family                               | Use                                                                             |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| `font-display` | **Cinzel** (serif, engraved/fantasy) | Wordmark + page `h1` hero only. Never body.                                     |
| `font-sans`    | **Geist Sans** (already installed)   | All UI, headings `h2`+, body.                                                   |
| `font-mono`    | **Geist Mono** (already installed)   | Numeric stats: price, rating, review count, schedule times. Use `tabular-nums`. |

**Wire the display font** in `src/app/layout.tsx` (Geist is already there):

```tsx
import { Geist, Geist_Mono } from "next/font/google";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
});
// add `${cinzel.variable}` to the <html> className alongside the geist variables
```

**Type scale** (use these, don't free-style sizes):

| Element             | Classes                                                       |
| ------------------- | ------------------------------------------------------------- |
| Hero `h1`           | `font-display text-4xl sm:text-5xl font-bold tracking-tight`  |
| Section `h2`        | `font-sans text-2xl font-semibold tracking-tight`             |
| Card title          | `font-sans text-base font-semibold`                           |
| Body                | `font-sans text-sm` (UI) / `text-base` (prose)                |
| Meta / label        | `text-xs font-medium uppercase tracking-wide text-text-faint` |
| Stat (price/rating) | `font-mono tabular-nums`                                      |

Headings use **negative tracking** (`tracking-tight`) per the Linear/Vercel playbook — it reads "engineered." Body stays default tracking.

---

## 5. The tokens (paste into `globals.css`)

Replace everything in `src/app/globals.css` with this. It keeps Tailwind v4's `@theme inline` pattern already in the repo.

```css
@import "tailwindcss";

/* ── Raw palette ─────────────────────────────────────────── */
:root {
  /* Dark is the default theme */
  --bg: #0b0c11;
  --surface: #14161d;
  --surface-2: #1b1e27;
  --border: #262a36;
  --border-strong: #363c4b;
  --text: #f4f5f7;
  --text-muted: #a8aebc;
  --text-faint: #6f7686;
  --accent: #7c6cff;
  --accent-hover: #9385ff;
  --accent-soft: rgba(124, 108, 255, 0.15);
  --accent-contrast: #ffffff;
  --gold: #ffb547;
  --gold-soft: rgba(255, 181, 71, 0.15);
}

/* Opt-in light theme: add class="light" to <html> (or wire a toggle later) */
.light {
  --bg: #faf8f5;
  --surface: #ffffff;
  --surface-2: #f4f2ee;
  --border: #e7e3dc;
  --border-strong: #d6d1c8;
  --text: #1c1917;
  --text-muted: #57534e;
  --text-faint: #8a8580;
  --accent: #5b4bdd;
  --accent-hover: #4a3ad0;
  --accent-soft: rgba(91, 75, 221, 0.1);
  --accent-contrast: #ffffff;
  --gold: #b8791b;
  --gold-soft: rgba(184, 121, 27, 0.12);
}

/* ── Semantic tokens → Tailwind utilities ────────────────── */
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-text-faint: var(--text-faint);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-soft: var(--accent-soft);
  --color-accent-contrast: var(--accent-contrast);
  --color-gold: var(--gold);
  --color-gold-soft: var(--gold-soft);

  /* Fonts */
  --font-display: var(--font-cinzel), Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Radius scale → rounded-sm/md/lg/xl/2xl */
  --radius-sm: 0.5rem; /* 8px  — chips, inputs, badges */
  --radius-md: 0.75rem; /* 12px — small panels, buttons */
  --radius-lg: 1rem; /* 16px — cards (the default) */
  --radius-xl: 1.5rem; /* 24px — hero/feature panels */

  /* Elevation → shadow-card / shadow-card-hover / shadow-glow */
  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 12px 32px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 0 1px var(--accent), 0 10px 30px rgba(124, 108, 255, 0.28);

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── Base ────────────────────────────────────────────────── */
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Consistent, on-brand focus ring for keyboard users */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

These generate utilities: `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`, `text-text`, `text-text-muted`, `text-accent`, `bg-accent`, `bg-accent-soft`, `text-gold`, `bg-gold-soft`, `font-display/sans/mono`, `rounded-sm/md/lg/xl`, `shadow-card`, `shadow-card-hover`, `shadow-glow`, `ease-out`.

---

## 6. Component anatomy (the rules)

**Card (GM card — the hero unit)**
`bg-surface` · `border border-border` · `rounded-lg` · `shadow-card` · `p-5`. On hover: `hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-card-hover` + transition. Optional premium touch: `hover:shadow-glow` on the featured/first card only.

**Tag / chip (inactive)**
`rounded-sm` · `bg-surface-2` · `text-text-muted` · `text-xs` · `px-2 py-0.5`. System tags get the accent tint: `bg-accent-soft text-accent`.

**Filter chip (toggle button)**

- Inactive: `border border-border-strong bg-transparent text-text-muted hover:text-text hover:border-accent`
- Active: `border-accent bg-accent text-accent-contrast`
  Always `rounded-full px-3 py-1 text-sm transition` and keep `aria-pressed`.

**Button (primary CTA)**
`bg-accent text-accent-contrast hover:bg-accent-hover rounded-md px-5 py-3 font-semibold transition`. One primary per view.

**Input / search / select**
`bg-surface border border-border-strong text-text placeholder:text-text-faint rounded-md px-3 py-2 focus:border-accent`. (Global `:focus-visible` handles the ring.)

**Rating badge**
`bg-gold-soft text-gold rounded-full px-2.5 py-1 text-sm font-medium` with the number in `font-mono tabular-nums`.

**Avatar tile**
`bg-accent-soft rounded-full` (or `rounded-lg` on detail) holding the emoji, sized `h-12 w-12` (card) / `h-20 w-20` (detail).

**Surface panels (FilterBar, footer, empty state)**
`bg-surface border border-border rounded-xl` (FilterBar) — empty state uses `border-dashed`.

---

## 7. Migration map (old → new)

Mechanical find-and-replace guide. Apply per component; pick the row by **intent**, not just the literal class.

| Old (current)                               | New (token)                                  | Notes                              |
| ------------------------------------------- | -------------------------------------------- | ---------------------------------- |
| `bg-white` (cards/header)                   | `bg-surface`                                 |                                    |
| `bg-stone-50` (footer)                      | `bg-surface`                                 |                                    |
| `bg-white/80 backdrop-blur` (header)        | `bg-bg/70 backdrop-blur`                     | glass header                       |
| body bg `#faf8f5`                           | `bg-bg` (via globals)                        | now dark                           |
| `border-stone-200` / `border-stone-100`     | `border-border`                              |                                    |
| `text-stone-900`                            | `text-text`                                  |                                    |
| `text-stone-700`                            | `text-text` (strong) / `text-text-muted`     | by emphasis                        |
| `text-stone-600`                            | `text-text-muted`                            |                                    |
| `text-stone-500`                            | `text-text-faint`                            |                                    |
| `text-indigo-600` / `-700`                  | `text-accent`                                |                                    |
| `hover:text-indigo-600`                     | `hover:text-accent`                          |                                    |
| `bg-indigo-600` (button/active chip)        | `bg-accent`                                  |                                    |
| `hover:bg-indigo-700`                       | `hover:bg-accent-hover`                      |                                    |
| `bg-indigo-50 text-indigo-700` (system tag) | `bg-accent-soft text-accent`                 |                                    |
| `bg-stone-100 text-stone-600` (style tag)   | `bg-surface-2 text-text-muted`               |                                    |
| `bg-amber-100` (avatar)                     | `bg-accent-soft`                             |                                    |
| `bg-amber-50 text-amber-800` (rating)       | `bg-gold-soft text-gold`                     |                                    |
| `text-amber-800/500`                        | `text-gold`                                  |                                    |
| `shadow-sm` (card rest)                     | `shadow-card`                                |                                    |
| `hover:shadow-md` (card hover)              | `hover:shadow-card-hover`                    |                                    |
| `rounded-2xl` (cards/panels)                | `rounded-lg` (cards) / `rounded-xl` (panels) | normalize to scale                 |
| `rounded-xl` (buttons)                      | `rounded-md`                                 |                                    |
| `focus:ring-2 focus:ring-indigo-100`        | _(remove)_                                   | global `:focus-visible` handles it |
| price / rating numerals                     | wrap in `font-mono tabular-nums`             | stat feel                          |

**Forbidden after migration:** any `stone-*`, `indigo-*`, `amber-*`, `gray-*`, `slate-*`, `white`, `black`, or arbitrary `[#hex]` / `[rgb(...)]` color utility. Grep for these as your acceptance check (see §10).

---

## 8. Component recipes

Concrete target for each file. Keep all logic, props, `data-testid`, `aria-*`, and hrefs identical — **styling only**.

- **`src/app/globals.css`** — replace with §5.
- **`src/app/layout.tsx`** — add Cinzel font var (§4); body already inherits tokens.
- **`src/components/Header.tsx`** — `border-border bg-bg/70 backdrop-blur`; wordmark `font-display text-lg font-bold text-text`; nav links `text-text-muted hover:text-accent`.
- **`src/components/Footer.tsx`** — `border-border bg-surface text-text-faint`; brand word `text-text`.
- **`src/components/GMCard.tsx`** — card per §6; avatar `bg-accent-soft`; rating badge `bg-gold-soft text-gold` with `font-mono tabular-nums`; system tags `bg-accent-soft text-accent`, style tags `bg-surface-2 text-text-muted`; price in `font-mono`; title `group-hover:text-accent`.
- **`src/components/FilterBar.tsx`** — panel `bg-surface border-border rounded-xl`; chips per §6 (active = `bg-accent`); input/select per §6; "Clear all filters" `text-accent hover:text-accent-hover`; group labels `text-text-faint`.
- **`src/components/Browse.tsx`** — result count `text-text-muted` (keep `data-testid="result-count"`); empty state `bg-surface/60 border-dashed border-border` with `text-text` heading + `text-text-faint` subtext (keep `data-testid="empty-state"`).
- **`src/app/page.tsx`** — hero `h1` `font-display`, accent word `text-accent`; subcopy `text-text-muted`.
- **`src/app/gms/page.tsx`** — headings `text-text`, subcopy `text-text-muted`.
- **`src/app/gms/[slug]/page.tsx`** — back link `text-accent hover:text-accent-hover`; avatar `bg-accent-soft`; stats (`rating · reviews · price`) in `font-mono tabular-nums`, price `text-text`, rating `text-gold`; section labels `text-text-faint`; slot pills `bg-surface border-border text-text-muted`; CTA button `bg-accent text-accent-contrast hover:bg-accent-hover rounded-md`.

---

## 9. Optional enhancements (only if time allows — keep deploy light)

- **`lucide-react`** for crisp UI icons (search, sliders, star, chevron) instead of inline emoji in _controls_. Keep emoji for GM **avatars** — they're on-brand and charming. (`npm i lucide-react`, ~1 dep.)
- **Featured glow:** first GM card gets `hover:shadow-glow` to read as "spotlight."
- **Gradient hero atmosphere:** one subtle radial accent glow behind the `h1` (`bg-[radial-gradient(...)]` using `--accent` at low alpha). Use _once_, per the Framer "atmosphere card" rule.
- **Theme toggle:** since light tokens already exist, a toggle that adds/removes `.light` on `<html>` is a small follow-up.

These are explicitly _optional_; the token migration (§5–§8) is the required core.

---

## 10. Definition of done (acceptance checklist)

The implementing agent must verify all of these:

- [ ] `globals.css` contains the token block from §5; no other color logic elsewhere.
- [ ] Cinzel wired in `layout.tsx`; wordmark + hero `h1` use `font-display`.
- [ ] **Grep is clean:** `grep -rEn "(stone|indigo|amber|gray|slate)-[0-9]|bg-white|text-white|#[0-9a-fA-F]{3,6}" src/` returns **nothing** (except token defs in `globals.css`).
- [ ] Every component restyled per §7–§8; radii/shadows use the scale, not ad-hoc values.
- [ ] Price/rating/review/time numerals use `font-mono tabular-nums`.
- [ ] All `data-testid`, `aria-*`, roles, and hrefs unchanged.
- [ ] Contrast spot-check: body text on `surface` ≥ 4.5:1; accent button text ≥ 4.5:1.
- [ ] `npm test` → all Playwright specs pass (the redesign must not break selectors).
- [ ] `npm run build` → compiles clean, all routes prerender.

> **Why tests gate the redesign:** the suite asserts on roles/text/`data-testid`, not classes — so a correct token migration leaves every test green. A red test means markup/structure drifted; fix that, don't loosen the test.

---

## 11. Quick reference — token cheat sheet

```
Surfaces:  bg-bg  bg-surface  bg-surface-2
Borders:   border-border  border-border-strong
Text:      text-text  text-text-muted  text-text-faint
Accent:    text-accent  bg-accent  hover:bg-accent-hover  bg-accent-soft  text-accent-contrast
Gold:      text-gold  bg-gold-soft
Radius:    rounded-sm(8) rounded-md(12) rounded-lg(16,cards) rounded-xl(24,panels) rounded-full
Shadow:    shadow-card  hover:shadow-card-hover  shadow-glow
Fonts:     font-display(headlines)  font-sans(UI)  font-mono(numbers)
```

</content>
</invoke>

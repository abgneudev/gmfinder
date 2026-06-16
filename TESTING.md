# Testing — GMFinder

End-to-end tests with [Playwright](https://playwright.dev). They drive a real
browser against the running app, so they verify the actual user experience
(routing, client-side filtering, navigation) — not just types.

## Run

```bash
npm test            # headless run of the whole suite
npm run test:ui     # interactive watch/debug UI
npm run test:report # open the last HTML report
```

`playwright.config.ts` auto-starts `npm run dev` on port 3000 and **reuses** an
already-running dev server locally, so the commands above just work whether or
not a server is up.

## Layout

- Tests live in `e2e/*.spec.ts`, one spec file per feature area
  (`browse.spec.ts`, `detail.spec.ts`, …).
- Tests are grouped with `test.describe(...)` and named after the user story or
  critical moment they protect.

## Convention — test every new feature as it lands

When you add a feature, add or extend a spec **in the same change**. Each feature
spec should cover:

1. **The happy path** — the core user story works end to end.
2. **State change is observable** — e.g. a filter actually narrows the list and
   the result count updates.
3. **The edge / empty case** — over-filtered, not-found, invalid input, etc.

### Selector rules (keep tests stable)

Prefer, in order:

1. **Roles + accessible names** — `getByRole("button", { name: "D&D 5e" })`,
   `getByRole("heading", { name: "Garrick Stone" })`.
2. **`data-testid`** for elements that are structural, not labeled — already in
   place: `gm-card`, `result-count`, `empty-state`. Add a new `data-testid`
   when (and only when) there is no good role/text handle.

Avoid asserting on CSS classes or DOM structure — they change with styling.

### Template

```ts
import { test, expect } from "@playwright/test";

test.describe("My feature", () => {
  test("does the core thing", async ({ page }) => {
    await page.goto("/");
    // act…
    // assert observable result (count, heading, URL, testid)…
  });
});
```

## When data changes

The current suite asserts against the seeded `src/data/gms.ts` fixtures (counts,
names, prices). If you change the seed data, update the affected assertions —
they are intentionally specific so a regression is caught, not hidden.

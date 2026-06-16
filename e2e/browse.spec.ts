import { test, expect } from "@playwright/test";

// Story 1 — see the list of GMs at a glance.
test.describe("Browse listing", () => {
  test("renders all seeded GMs with a result count", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Find your/i }),
    ).toBeVisible();
    await expect(page.getByTestId("gm-card")).toHaveCount(8);
    await expect(page.getByTestId("result-count")).toHaveText("8 Game Masters");
  });
});

// Story 2 — filter by system and style. AND across facets, OR within.
test.describe("Filtering", () => {
  test("filtering by a system narrows the list", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Old-School Essentials" }).click();
    // Only Garrick Stone runs OSE.
    await expect(page.getByTestId("gm-card")).toHaveCount(1);
    await expect(page.getByTestId("result-count")).toHaveText("1 Game Master");
    await expect(
      page.getByRole("heading", { name: "Garrick Stone" }),
    ).toBeVisible();
  });

  test("system AND style compose (intersection)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "D&D 5e" }).click();
    const afterSystem = await page.getByTestId("gm-card").count();
    await page.getByRole("button", { name: "Beginner-friendly" }).click();
    const afterStyle = await page.getByTestId("gm-card").count();
    expect(afterStyle).toBeLessThan(afterSystem);
    expect(afterStyle).toBeGreaterThan(0);
  });

  test("search matches name or tagline", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder(/Search by name or vibe/i).fill("horror");
    // Dario Vex's tagline is about horror one-shots.
    await expect(
      page.getByRole("heading", { name: "Dario Vex" }),
    ).toBeVisible();
    await expect(page.getByTestId("gm-card")).toHaveCount(1);
  });

  test("clear filters restores the full list", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Old-School Essentials" }).click();
    await expect(page.getByTestId("gm-card")).toHaveCount(1);
    await page.getByRole("button", { name: /Clear all filters/i }).click();
    await expect(page.getByTestId("gm-card")).toHaveCount(8);
  });
});

// Critical moment 3 — friendly empty state, never a blank void.
test.describe("Empty state", () => {
  test("over-filtering shows a friendly message", async ({ page }) => {
    await page.goto("/");
    // Honey Heist GM (Wren) is cozy, not hardcore — combine impossible facets.
    await page.getByRole("button", { name: "Honey Heist" }).click();
    await page.getByRole("button", { name: "Hardcore" }).click();
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByText(/No GMs match/i)).toBeVisible();
    await expect(page.getByTestId("gm-card")).toHaveCount(0);
  });
});

// Story 5 — sort by price.
test.describe("Sorting", () => {
  test("price low-to-high orders the first card cheapest", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox").selectOption("priceAsc");
    const firstCard = page.getByTestId("gm-card").first();
    // Cheapest seed is Wren Fairweather at $18.
    await expect(firstCard).toContainText("$18");
  });
});

import { test, expect } from "@playwright/test";

// Story 4 — click a GM and see a detail page; commit to one.
test.describe("GM detail page", () => {
  test("clicking a card navigates to its detail page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByTestId("gm-card")
      .filter({ hasText: "Lyra Meadowlight" })
      .click();
    await expect(page).toHaveURL(/\/gms\/lyra-meadowlight$/);
    await expect(
      page.getByRole("heading", { name: "Lyra Meadowlight" }),
    ).toBeVisible();
  });

  test("detail page shows systems, styles, and all session slots", async ({
    page,
  }) => {
    await page.goto("/gms/lyra-meadowlight");
    await expect(page.getByText("Systems")).toBeVisible();
    await expect(page.getByText("Available sessions")).toBeVisible();
    // Lyra's seeded slots.
    await expect(page.getByText("Mon 6pm ET")).toBeVisible();
    await expect(page.getByText("Thu 8pm ET")).toBeVisible();
  });

  test("back link returns to the listing", async ({ page }) => {
    await page.goto("/gms/lyra-meadowlight");
    await page.getByRole("link", { name: /Back to all GMs/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("gm-card")).toHaveCount(8);
  });

  test("unknown slug returns a 404", async ({ page }) => {
    const res = await page.goto("/gms/does-not-exist");
    expect(res?.status()).toBe(404);
  });
});

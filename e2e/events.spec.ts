import { test, expect } from "@playwright/test";

// Story 1 — see the upcoming sessions at a glance.
test.describe("Events listing", () => {
  test("renders all seeded sessions", async ({ page }) => {
    await page.goto("/events");
    await expect(
      page.getByRole("heading", { name: "Upcoming Sessions" }),
    ).toBeVisible();
    await expect(page.getByTestId("event-card")).toHaveCount(8);
  });
});

// Story 2 — sessions are ordered soonest-first, and seat status is visible.
test.describe("Sorting and seat status", () => {
  test("the soonest session sorts to the top", async ({ page }) => {
    await page.goto("/events");
    const firstCard = page.getByTestId("event-card").first();
    // Earliest seed is "Tea & Tiny Quests" on Jun 20.
    await expect(firstCard).toContainText("Tea & Tiny Quests");
    await expect(firstCard).toContainText("Jun 20");
  });

  test("seat badges reflect availability", async ({ page }) => {
    await page.goto("/events");
    // 4 open, 3 filling (seatsLeft <= 2), 1 sold-out across the seed set.
    await expect(page.getByText("Seats open")).toHaveCount(4);
    await expect(page.getByText("Filling fast")).toHaveCount(3);
  });
});

// Story 3 — each session links through to the GM hosting it.
test.describe("GM lookup", () => {
  test("Join navigates to the host GM's profile", async ({ page }) => {
    await page.goto("/events");
    const firstCard = page.getByTestId("event-card").first();
    // "Tea & Tiny Quests" is hosted by Wren Fairweather.
    await expect(firstCard).toContainText("Wren Fairweather");
    await firstCard.getByRole("link", { name: "Join" }).click();
    await expect(page).toHaveURL(/\/gms\/wren-fairweather$/);
  });
});

// Edge case — a sold-out session is not joinable.
test.describe("Sold-out sessions", () => {
  test("a full session shows Sold out and no Join link", async ({ page }) => {
    await page.goto("/events");
    const soldOut = page
      .getByTestId("event-card")
      .filter({ hasText: "The Lighthouse Keeper's Last Night" });
    await expect(soldOut).toContainText("Sold out");
    await expect(soldOut.getByRole("link", { name: "Join" })).toHaveCount(0);
  });
});

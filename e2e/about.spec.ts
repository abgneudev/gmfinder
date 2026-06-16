import { test, expect } from "@playwright/test";

// The static About / How it works / FAQ page.
test.describe("About page", () => {
  test("renders the three anchored sections", async ({ page }) => {
    const res = await page.goto("/about");
    expect(res?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: /About GMFinder/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How it works/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Frequently asked questions/i }),
    ).toBeVisible();
  });

  test("shows every FAQ entry as an accordion item", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByTestId("faq-item")).toHaveCount(7);
  });

  test("Header 'How it works' link navigates from home to /about", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("link", { name: "How it works" })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("heading", { name: /About GMFinder/i }),
    ).toBeVisible();
  });
});

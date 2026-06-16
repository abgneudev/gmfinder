import { test, expect } from "@playwright/test";

// Shell — global header/footer give the deployed app real navigation.
test.describe("Global navigation", () => {
  test("header is present with brand and nav", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "GMFinder" })).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Browse GMs" }),
    ).toBeVisible();
  });

  test("Browse GMs link navigates to the listing", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Browse GMs" })
      .click();
    await expect(page).toHaveURL(/\/gms$/);
    await expect(page.getByTestId("gm-card")).toHaveCount(8);
  });

  test("brand link returns home from a deep page", async ({ page }) => {
    await page.goto("/gms/lyra-meadowlight");
    await page
      .getByRole("banner")
      .getByRole("link", { name: "GMFinder" })
      .click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("footer is present on every page", async ({ page }) => {
    await page.goto("/gms/lyra-meadowlight");
    await expect(page.getByRole("contentinfo")).toContainText(
      "© 2026 GMFinder",
    );
  });
});

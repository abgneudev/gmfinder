import { test, expect, type Page } from "@playwright/test";

// The quiz asks four questions in order: experience, vibe, world, budget.
// Each option is a button whose accessible name starts with its label.
async function answer(page: Page, label: string | RegExp) {
  await page.getByRole("button", { name: label }).click();
}

// Drive the whole quiz with one option label per question.
async function takeQuiz(
  page: Page,
  [experience, vibe, world, budget]: [
    string | RegExp,
    string | RegExp,
    string | RegExp,
    string | RegExp,
  ],
) {
  await page.goto("/quiz");
  await answer(page, experience);
  await answer(page, vibe);
  await answer(page, world);
  await answer(page, budget);
}

// Story 1 — the core flow: answer everything, get three recommendations that
// link to real GM profiles.
test.describe("Quiz happy path", () => {
  test("answering all questions yields three linked recommendations", async ({
    page,
  }) => {
    await takeQuiz(page, [/Brand new/, /Epic combat/, /High fantasy/, /Treat myself/]);

    await expect(
      page.getByRole("heading", { name: /Your top \d+ Game Master/i }),
    ).toBeVisible();
    await expect(page.getByTestId("quiz-result")).toHaveCount(3);

    // The top match links to that GM's detail page.
    const top = page.getByTestId("quiz-result").first();
    await expect(top).toContainText("Top match");
    await top.click();
    // The GM detail route is a dynamic page; allow for first-hit dev compile.
    await expect(page).toHaveURL(/\/gms\/[a-z-]+$/, { timeout: 30000 });
  });
});

// Story 2 — answers actually change the outcome. A brand-new player and a
// veteran asking for the same combat/fantasy night get different top matches.
test.describe("Quiz recommendations respond to answers", () => {
  test("experience changes the top recommendation", async ({ page }) => {
    await takeQuiz(page, [/Brand new/, /Epic combat/, /High fantasy/, /Treat myself/]);
    // Kai runs beginner-friendly combat — the right call for a newcomer.
    await expect(page.getByTestId("quiz-result").first()).toContainText(
      "Kai Emberforge",
    );

    await takeQuiz(page, [
      /Seasoned adventurer/,
      /Epic combat/,
      /High fantasy/,
      /Treat myself/,
    ]);
    // A veteran gets Thorne's cinematic homebrew combat instead.
    await expect(page.getByTestId("quiz-result").first()).toContainText(
      "Thorne Blackwood",
    );
  });
});

// Edge case — the budget filter genuinely removes over-budget GMs, and
// retaking resets the quiz to the first question.
test.describe("Quiz budget and retake", () => {
  test("under-$25 budget excludes pricier GMs", async ({ page }) => {
    await takeQuiz(page, [
      /Seasoned adventurer/,
      /Epic combat/,
      /High fantasy/,
      /Under \$25/,
    ]);
    await expect(page.getByTestId("quiz-result")).toHaveCount(3);
    // Thorne ($25) and Garrick ($30) are over the $25 cap and must not appear.
    await expect(page.getByText("Thorne Blackwood")).toHaveCount(0);
    await expect(page.getByText("Garrick Stone")).toHaveCount(0);
  });

  test("retake returns to the first question", async ({ page }) => {
    await takeQuiz(page, [/Brand new/, /Cozy & casual/, /High fantasy/, /Treat myself/]);
    await expect(page.getByRole("button", { name: /Retake quiz/i })).toBeVisible();
    await page.getByRole("button", { name: /Retake quiz/i }).click();
    await expect(page.getByText("Question 1 of")).toBeVisible();
    await expect(page.getByTestId("quiz-result")).toHaveCount(0);
  });
});

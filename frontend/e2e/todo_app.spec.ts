import { test, expect } from "@playwright/test";

const apiUrl = "http://localhost:5173/";

test.describe("Todo App", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto(apiUrl);

    await expect(page).toHaveTitle(/Todo App/);
  });

  test("header is visible", async ({ page }) => {
    await page.goto(apiUrl);

    const header = page.getByRole('heading', { name: 'Todo App' })

    await expect(header).toBeVisible()
    await expect(header).toHaveText('Todo App')
  });
});

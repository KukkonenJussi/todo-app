import { test, expect } from "@playwright/test";

const apiUrl = "http://localhost:5173/"

test("front page can be opened", async ({ page }) => {
  await page.goto(apiUrl);

  await expect(page).toHaveTitle(/Todo App/);
});

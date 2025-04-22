import { test, expect } from "@playwright/test";

const apiUrl = "http://localhost:5173/";

test.describe("Todo App", () => {
  test.describe("UI visibility and layout", () => {
    test("front page can be opened", async ({ page }) => {
      await page.goto(apiUrl);

      await expect(page).toHaveTitle(/Todo App/);
    });

    test("header is visible", async ({ page }) => {
      await page.goto(apiUrl);

      const header = page.getByRole("heading", { name: "Todo App" });

      await expect(header).toBeVisible();
      await expect(header).toHaveText("Todo App");
    });
  });
  test.describe.skip("Adding Todo items", () => {
    test("should allow user to add a new todo item", async ({ page }) => {

    })
    test("should show error if trying to add empty name", async ({ page }) => {

    })
    test("should show error if trying to add duplicate name", async ({ page }) => {

    })
    test("should show error if name exceeds 50 characters", async ({ page }) => {

    })
    test("should show success message when todo is added", async ({ page }) => {

    })
  })
  test.describe.skip("Deleting Todo items", () => {
    test("should allow user to delete a todo item", async ({ page }) => {

    })
    test("should show confirmation alert before deletion", async ({ page }) => {

    })
    test("should show success message when todo is deleted", async ({ page }) => {

    })
  })
});

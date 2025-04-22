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

  test.describe("Adding Todo items", () => {
    test("should allow user to add a new todo item", async ({ page }) => {
      await page.goto(apiUrl);

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page
        .getByRole("textbox", { name: "Add item" })
        .fill("Hello World!");
      await page.getByRole("button", { name: "Add" }).click();

      await expect(
        page.getByRole("cell", { name: "Hello World!" })
      ).toBeVisible();
      await expect(page.getByRole("rowgroup")).toContainText("Hello World!");
    });

    test("should show error if trying to add empty name", async ({ page }) => {
      await page.goto(apiUrl);

      await page.getByRole("button", { name: "Add" }).click();

      await expect(page.getByText("Name is required!")).toBeVisible();
      await expect(page.getByRole("alert")).toContainText("Name is required!");
    });

    test("should show error if trying to add duplicate name", async ({
      page,
    }) => {
      await page.goto(apiUrl);

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page
        .getByRole("textbox", { name: "Add item" })
        .fill("Hello World!");
      await page.getByRole("button", { name: "Add" }).click();

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page
        .getByRole("textbox", { name: "Add item" })
        .fill("Hello World!");
      await page.getByRole("button", { name: "Add" }).click();

      await expect(page.getByText("Name already exists!")).toBeVisible();
      await expect(page.getByRole("alert")).toContainText(
        "Name already exists!"
      );
    });

    test("should show error if name exceeds 50 characters", async ({
      page,
    }) => {
      await page.goto(apiUrl);

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page
        .getByRole("textbox", { name: "Add item" })
        .fill("Lorem ipsum dolor sit amet, consectetur adipiscing non.");
      await page.getByRole("button", { name: "Add" }).click();

      await expect(
        page.getByText("Name must be 50 characters or")
      ).toBeVisible();
      await expect(page.getByRole("alert")).toContainText(
        "Name must be 50 characters or less!"
      );
    });

    test.skip("should show success message when todo is added", async ({
      page,
    }) => {});
  });

  test.describe("Deleting Todo items", () => {
    test("should show confirmation alert before deletion", async ({ page }) => {
      await page.goto(apiUrl);

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page.getByRole("textbox", { name: "Add item" }).fill("Test");
      await page.getByRole("button", { name: "Add" }).click();
      await page.getByRole("row", { name: "Test" }).getByRole("button").click();

      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Delete");
        await dialog.dismiss(); // tai dismiss(), if you do not want to cancel a Todo
      });

      await page.getByRole("row", { name: "Test" }).getByRole("button").click();
    });

    test("should allow user to delete a todo item", async ({
      page,
    }) => {
      await page.goto(apiUrl);

      await page.getByRole("textbox", { name: "Add item" }).click();
      await page.getByRole("textbox", { name: "Add item" }).fill("Test");
      await page.getByRole("button", { name: "Add" }).click();
      await page.getByRole("row", { name: "Test" }).getByRole("button").click();

      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Delete");
        await dialog.accept(); // or dismiss(), if you do not want to cancel a Todo
      });

      await page.getByRole("row", { name: "Test" }).getByRole("button").click();

      await expect(page.getByRole("cell", { name: "Test" })).toHaveCount(0)
    });

    test.skip("should show success message when todo is deleted", async ({
      page,
    }) => {});
  });
});

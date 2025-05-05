import { test, expect, request } from "@playwright/test";

const apiUrl = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  const context = await request.newContext();
  await context.post(`${apiUrl}/reset`);
  await page.goto(apiUrl);
});

test.describe("Todo App", () => {
  test.describe("UI visibility and layout", () => {
    test("front page can be opened", async ({ page }) => {
      await expect(page).toHaveTitle(/Todo App/);
    });

    test("header is visible", async ({ page }) => {
      const header = page.getByText("Todo App", { exact: true });

      await expect(header).toBeVisible();
      await expect(header).toHaveText("Todo App");
    });
  });

  test.describe("Adding Todo items", () => {
    test("should allow user to add a new todo item", async ({ page }) => {
      const uniqueName = `Hello World ${Date.now()}`;

      await page.getByRole("textbox", { name: "Add item" }).fill(uniqueName);
      await page.getByRole("button", { name: "Add" }).click();

      await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();
      await expect(page.getByRole("rowgroup")).toContainText(uniqueName);
    });

    test("should show error if trying to add empty name", async ({ page }) => {
      await page.getByRole("button", { name: "Add" }).click();

      await expect(page.getByText("Name is required!")).toBeVisible();
      await expect(page.getByRole("alert")).toContainText("Name is required!");
    });

    test("should show error if trying to add duplicate name", async ({
      page,
    }) => {
      const duplicateName = `Duplicate ${Date.now()}`;

      await page.getByRole("textbox", { name: "Add item" }).fill(duplicateName);
      await page.getByRole("button", { name: "Add" }).click();
      await page.getByRole("textbox", { name: "Add item" }).fill(duplicateName);
      await page.getByRole("button", { name: "Add" }).click();

      await expect(page.getByText("Name already exists!")).toBeVisible();
      await expect(page.getByRole("alert")).toContainText(
        "Name already exists!"
      );
    });

    test("should show error if name exceeds 50 characters", async ({
      page,
    }) => {
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

    test("should show success message when todo is added", async ({ page }) => {
      const uniqueName = `Test todo ${Date.now()}`;

      await page.getByRole("textbox", { name: "Add item" }).fill(uniqueName);
      await page.getByRole("button", { name: "Add" }).click();

      const alertElement = page.getByRole("alert");
      await expect(alertElement).toBeVisible();
      await expect(alertElement).toContainText(
        `'${uniqueName}' added succesfully!`
      );
    });
  });

  test.describe("Deleting Todo items", () => {
    test("should show confirmation alert before deletion", async ({ page }) => {
      const uniqueName = `Test todo ${Date.now()}`;
      await page.getByRole("textbox", { name: "Add item" }).fill(uniqueName);
      await page.getByRole("button", { name: "Add" }).click();

      await page
        .getByRole("row", { name: `${uniqueName} Delete Todo Edit Todo` })
        .getByLabel("Delete Todo")
        .click();

      await expect(
        page.getByRole("heading", { name: "Delete confirmation" })
      ).toBeVisible();
      await expect(page.locator("#alert-dialog-title")).toContainText(
        "Delete confirmation"
      );
    });

    test("should allow user to delete a todo item", async ({ page }) => {
      const uniqueName = `Test todo ${Date.now()}`;
      await page.getByRole("textbox", { name: "Add item" }).fill(uniqueName);
      await page.getByRole("button", { name: "Add" }).click();
      await page
        .getByRole("row", { name: `${uniqueName} Delete Todo Edit Todo` })
        .getByLabel("Delete Todo")
        .click();
      await page.getByRole("button", { name: "Delete" }).click();

      await expect(page.getByRole("cell", { name: uniqueName })).toHaveCount(0);
    });

    test("should show success message when todo is deleted", async ({
      page,
    }) => {
      await page
        .getByRole("textbox", { name: "Add item" })
        .fill("Do not ignore doing tests!");
      await page.getByRole("button", { name: "Add" }).click();

      await page
        .getByRole("row", { name: "Do not ignore doing tests!" })
        .getByLabel("Delete Todo")
        .click();
      await page.getByRole("button", { name: "Delete" }).click();

      await expect(page.getByRole("alert")).toContainText(
        "'Do not ignore doing tests!' deleted succesfully!"
      );
    });
  });
});

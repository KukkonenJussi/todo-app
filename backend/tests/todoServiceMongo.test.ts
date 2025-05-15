import todoServiceMongo from "../src/services/todoServiceMongo";
import { setupTestDatabase } from "./mongoTestSetup";

setupTestDatabase();

describe("getAllTodos", () => {
  it("returns all todos", async () => {
    const todos = await todoServiceMongo.getAllTodos();

    expect(todos).toHaveLength(3);
    expect(todos[0].name).toBe("Build a Todo App");
  });

  it("returns only the todos that belong to the specified user", async () => {
    const todos = await todoServiceMongo.getAllTodos("user1");

    expect(todos).toHaveLength(2);
  });

  it("does not return todos belonging to other users", async () => {
    const correctTodos = await todoServiceMongo.getAllTodos("user2");

    expect(correctTodos.every((todo) => todo.userId === "user2")).toBe(true);
  });

  it("return an empty array if the user has no todos", async () => {
    const todos = await todoServiceMongo.getAllTodos("unknown-user");

    expect(todos).toEqual([]);
  });
});

import todoServiceMongo from "../todoServiceMongo";
import { TodoItemMongoose } from "../../types";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

vi.mock("../todoServiceMongo", () => ({
  default: {
    getAllTodos: vi.fn(),
  },
}));

describe("todoServiceMongo frontend service", () => {
  const mockTodos: TodoItemMongoose[] = [
    { id: "1", name: "Build a Todo App", completed: false, userId: "user1" },
    { id: "2", name: "Learn TDD", completed: false, userId: "user1" },
    { id: "3", name: "Test test", completed: false, userId: "user2" },
  ];

  beforeEach(() => {
    (todoServiceMongo.getAllTodos as Mock).mockImplementation(
      (userId: string) =>
        Promise.resolve(mockTodos.filter((todo) => todo.userId === userId))
    );
  });

  it("fetches all todos for user1", async () => {
    const todos: TodoItemMongoose[] = await todoServiceMongo.getAllTodos(
      "user1"
    );

    expect(todos.length).toBe(2);
    expect(todos.every((todo) => todo.userId === "user1")).toBe(true);
  });
});

import request from "supertest";
import app from "../src/app";
import { setupTestDatabase } from "./mongoTestSetup";
import Todo from "../src/models/Todo";
import { TodoData } from "../src/types";

setupTestDatabase();

describe("GET /todos", () => {
  it("returns status code 200 and all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

describe("GET /todos/:id", () => {
  it("returns status code 200 and the todo when the ID is valid", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    const todoId = todo?._id.toString();

    const response = await request(app).get(`/todos/${todoId}`);
    const todoData = response.body as TodoData;

    expect(response.status).toBe(200);
    expect(todoData._id).toBe(todoId);
    expect(todoData.name).toBe("Build a Todo App");
    expect(todoData.completed).toBe(false);
    expect(todoData.userId).toBe("user1");
  });
});

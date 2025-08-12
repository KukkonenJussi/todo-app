import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app";
import { TodoData } from "../src/types";
import Todo from "../src/models/Todo";
import { setupTestDatabase } from "./mongoTestSetup";

setupTestDatabase();

describe("GET /todos", () => {
  it("returns status code 200 and all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

describe("GET /todos/:id", () => {
  it("returns status code 200 and the todo when the user owns it", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    if (!todo) {
      throw new Error(`Error: Todo ${todo} not found!`);
    }
    const todoId = todo._id.toString();

    const response = await request(app).get(
      `/todos/${todo._id}?userId=${todo.userId}`
    );
    const todoData = response.body as TodoData;

    expect(response.status).toBe(200);
    expect(todoData._id).toBe(todoId);
    expect(todoData.name).toBe("Build a Todo App");
    expect(todoData.completed).toBe(false);
    expect(todoData.userId).toBe("user1");
  });

  it("returns status code 404 when the todo is not found", async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString();
    // const nonExistingId = "68272e369206bfc8869e7cd2"; // An alternative way is to set a generated mongoose objectId as a string and use it

    const response = await request(app).get(`/todos/${nonExistingId}`);
    const body = response.body as { error: string };

    expect(response.status).toBe(404);
    expect(body.error).toBe("Todo not found!");
  });

  it("returns status code 403 when the user is not authorized to access the todo", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    if (!todo) {
      throw new Error(`Error: Todo ${todo} not found!`);
    }
    const todoId = todo._id.toString();

    const response = await request(app).get(`/todos/${todoId}?userId=user2`);
    const body = response.body as { error: string };

    expect(response.status).toBe(403);
    expect(body.error).toBe("Not authorized to access this todo");
  });
});

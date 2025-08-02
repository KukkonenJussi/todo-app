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
  it("returns status code 200 and the todo when the ID is valid and user owns it", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    const todoId = todo?._id.toString();

    const response = await request(app).get(`/todos/${todoId}?userId=user1`);
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
});

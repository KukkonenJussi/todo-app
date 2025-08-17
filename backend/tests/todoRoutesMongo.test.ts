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

  it("returns status code 200 and only todos belonging to the specified user", async () => {
    const response = await request(app).get("/todos?userId=user1");
    const body = response.body as Array<{
      _id: string;
      name: string;
      userId: string;
    }>;

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    for (const todo of body) {
      expect(todo.userId).toBe("user1");
    }
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

describe("POST /todos", () => {
  it("returns status code 201 and stores the given userId when it is valid", async () => {
    const validUserId = new mongoose.Types.ObjectId().toString();
    const newTodo = {
      name: "Learn new programming concepts",
      userId: validUserId,
    };

    const response = await request(app).post("/todos").send(newTodo);
    const todoData = response.body as TodoData;

    expect(response.status).toBe(201);
    expect(todoData.userId).toBe(validUserId);
    expect(todoData.name).toBe("Learn new programming concepts");
  });

  it("returns status code 400 when todo name is empty", async () => {
    const newTodo = {
      name: "",
    };

    const response = await request(app).post("/todos").send(newTodo);
    const body = response.body as { error: string };

    expect(response.status).toBe(400);
    expect(body.error).toBe("Name is required!");
  });

  it("returns status code 400 when name length is greater than 50 characters", async () => {
    const newTodo = {
      name: "a".repeat(51),
    };

    const response = await request(app).post("/todos").send(newTodo);
    const body = response.body as { error: string };

    expect(response.status).toBe(400);
    expect(body.error).toBe("Name must be 50 characters or less!");
  });

  it("returns status code 201 and sets userId to demoUser when userId is missing", async () => {
    const newTodo = {
      name: "Watch a movie",
    };

    const response = await request(app).post("/todos").send(newTodo);
    const todoData = response.body as TodoData;

    expect(response.status).toBe(201);
    expect(todoData.userId).toBe("demoUser");
  });
});

describe("DELETE /todos/:id", () => {
  it("returns status code 200 and the deleted todo when valid id and userId are provided", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    if (!todo) {
      throw new Error(`Error: Todo ${todo} not found!`);
    }
    const todoId = todo._id.toString();

    const response = await request(app).delete(
      `/todos/${todoId}?userId=${todo.userId}`
    );
    const todoData = response.body as TodoData;

    expect(response.status).toBe(200);
    expect(todoData._id).toBe(todoId);
    expect(todoData.name).toBe(todo.name);
    expect(todoData.userId).toBe(todo.userId);
  });

  it("returns status code 403 when user is not authorized to delete todo", async () => {
    const todo = await Todo.findOne({ name: "Build a Todo App" });
    if (!todo) {
      throw new Error(`Error: Todo ${todo} not found!`);
    }
    const todoId = todo._id.toString();

    const response = await request(app).delete(`/todos/${todoId}?userId=user2`);
    const body = response.body as { error: string };

    expect(response.status).toBe(403);
    expect(body.error).toBe("Not authorized to access this todo");
  });

  it("returns status code 404 when the todo is not found", async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString();
    // const nonExistingId = "68272e369206bfc8869e7cd2"; // An alternative way is to set a generated mongoose objectId as a string and use it

    const response = await request(app).get(
      `/todos/${nonExistingId}?userId=user1`
    );
    const body = response.body as { error: string };

    expect(response.status).toBe(404);
    expect(body.error).toBe("Todo not found!");
  });
});

describe("DELETE /todos/", () => {
  it("returns status code 200 and removes only todos of the specified user", async () => {
    const response = await request(app)
      .delete("/todos?userId=user1")
      .set("x-user-id", "user1");
    const user1todos = await request(app).get(`/todos?userId=user1`);
    const user2todos = await request(app).get(`/todos?userId=user2`);

    const user1body = user1todos.body as Array<{
      _id: string;
      name: string;
      userId: string;
    }>;

    const user2body = user2todos.body as Array<{
      _id: string;
      name: string;
      userId: string;
    }>;

    expect(response.status).toBe(200);
    expect(user1body.length).toBe(0);
    expect(user2body.length).toBeGreaterThan(0);
  });

  it("returns status code 401 when deleting another user's todos", async () => {
    const response = await request(app)
      .delete("/todos?userId=user2")
      .set("x-user-id", "user1");
    const body = response.body as { error: string };

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized access");
  });
});

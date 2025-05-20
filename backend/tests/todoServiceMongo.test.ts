import todoServiceMongo from "../src/services/todoServiceMongo";
import { setupTestDatabase } from "./mongoTestSetup";
import Todo from "../src/models/Todo";
import { NewTodoData } from "../src/types";
import mongoose, { isValidObjectId } from "mongoose";

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

describe("getTodoById", () => {
  it("returns the correct todo when given a valid id", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    const id = existingTodo?._id.toString();

    const todo = await todoServiceMongo.getTodoById(id!);

    expect(todo.name).toBe("Build a Todo App");
    expect(todo.completed).toBe(false);
    expect(todo.userId).toBe("user1");
  });

  it("throws an error when todo with given ID does not exist", async () => {
    const nonExistingId = "68272e369206bfc8869e7cd2";

    await expect(todoServiceMongo.getTodoById(nonExistingId)).rejects.toThrow(
      "Todo not found!"
    );
  });
});

describe("addTodo", () => {
  it("returns 'demoUser' as userId when no userId is provided", async () => {
    const newTodo: NewTodoData = {
      name: "Test TodoData",
    };

    const addedTodo = await todoServiceMongo.addTodo(newTodo);

    expect(addedTodo.name).toBe("Test TodoData");
    expect(addedTodo.completed).toBe(false);
    expect(addedTodo._id).toBeDefined();
    expect(isValidObjectId(addedTodo._id));
    expect(addedTodo.userId).toBe("demoUser");
  });

  it("uses 'demoUser' if provided userId is invalid", async () => {
    const newTodo: NewTodoData = {
      name: "Test TodoData",
      userId: "not-valid-userId",
    };

    const addedTodo = await todoServiceMongo.addTodo(newTodo);

    expect(addedTodo.userId).toBe("demoUser");
  });

  it("sets the correct userId when provided", async () => {
    const testUserId = new mongoose.Types.ObjectId().toString();
    const newTodo: NewTodoData = {
      name: "Logged-in User",
      userId: testUserId,
    };

    const addedTodo = await todoServiceMongo.addTodo(newTodo);

    console.log({ addedTodo });

    expect(addedTodo.name).toBe("Logged-in User");
    expect(addedTodo.userId).toBe(testUserId);
  });

  it("throws an error when a new todo does not have a name", async () => {
    const invalidTodo: NewTodoData = {
      name: "",
    };

    await expect(todoServiceMongo.addTodo(invalidTodo)).rejects.toThrow(
      "Name is required!"
    );
  });

  it("throws an error if name exceeds 50 characters", async () => {
    const longName = "a".repeat(51);
    const invalidTodo: NewTodoData = {
      name: longName,
    };

    await expect(todoServiceMongo.addTodo(invalidTodo)).rejects.toThrow(
      "Name must be 50 characters or less!"
    );
  });
});

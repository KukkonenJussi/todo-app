import todoServiceMongo from "../src/services/todoServiceMongo";
import { setupTestDatabase } from "./mongoTestSetup";
import Todo from "../src/models/Todo";
import { NewTodoData } from "../src/types";
import mongoose, { isValidObjectId } from "mongoose";

setupTestDatabase();

describe("getAllTodos", () => {
  it("should return all todos when no userId is provided", async () => {
    const todos = await todoServiceMongo.getAllTodos();

    expect(todos).toHaveLength(3);
    expect(todos[0].name).toBe("Build a Todo App");
  });

  it("should return todos that belong to the specified user", async () => {
    const todos = await todoServiceMongo.getAllTodos("user1");

    expect(todos).toHaveLength(2);
  });

  it("should not return todos belonging to other users", async () => {
    const correctTodos = await todoServiceMongo.getAllTodos("user2");

    expect(correctTodos.every((todo) => todo.userId === "user2")).toBe(true);
  });

  it("should return an empty array if the user has no todos", async () => {
    const todos = await todoServiceMongo.getAllTodos("unknown-user");

    expect(todos).toEqual([]);
  });
});

describe("getTodoById", () => {
  it("should return the correct todo when given a valid id", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    const id = existingTodo?._id.toString();

    const todo = await todoServiceMongo.getTodoById(id!);

    expect(todo.name).toBe("Build a Todo App");
    expect(todo.completed).toBe(false);
    expect(todo.userId).toBe("user1");
  });

  it("should throw an error when todo with the given id does not exist", async () => {
    const nonExistingId = "68272e369206bfc8869e7cd2";

    await expect(todoServiceMongo.getTodoById(nonExistingId)).rejects.toThrow(
      "Todo not found!"
    );
  });
});

describe("addTodo", () => {
  it("should return 'demoUser' as userId when no userId is provided", async () => {
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

  it("should fallback to 'demoUser' if provided userId is invalid", async () => {
    const newTodo: NewTodoData = {
      name: "Test TodoData",
      userId: "not-valid-userId",
    };

    const addedTodo = await todoServiceMongo.addTodo(newTodo);

    expect(addedTodo.userId).toBe("demoUser");
  });

  it("should set the correct userId when a valid userId is provided", async () => {
    const testUserId = new mongoose.Types.ObjectId().toString();
    const newTodo: NewTodoData = {
      name: "Logged-in User",
      userId: testUserId,
    };

    const addedTodo = await todoServiceMongo.addTodo(newTodo);

    expect(addedTodo.name).toBe("Logged-in User");
    expect(addedTodo.userId).toBe(testUserId);
  });

  it("should throw an error when todo name is empty", async () => {
    const invalidTodo: NewTodoData = {
      name: "",
    };

    await expect(todoServiceMongo.addTodo(invalidTodo)).rejects.toThrow(
      "Name is required!"
    );
  });

  it("should throw an error when name exceeds 50 characters", async () => {
    const longName = "a".repeat(51);
    const invalidTodo: NewTodoData = {
      name: longName,
    };

    await expect(todoServiceMongo.addTodo(invalidTodo)).rejects.toThrow(
      "Name must be 50 characters or less!"
    );
  });
});

describe("deleteTodo", () => {
  it("should delete the todo when given a valid id", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    const id = existingTodo?._id.toString();

    const deletedTodo = await todoServiceMongo.deleteTodo(id!);
    const allTodos = await todoServiceMongo.getAllTodos();

    expect(allTodos).not.toContain(deletedTodo);
  });

  it("should throw an error when given id does not exist", async () => {
    const nonExistingId = "68272e369206bfc8869e7cd2";

    await expect(todoServiceMongo.deleteTodo(nonExistingId)).rejects.toThrow(
      "Todo not found!"
    );
  });
});

describe("deleteAllTodos", () => {
  it("should delete all todos that belong to a specific user", async () => {
    const todosBeforeDeletion = await todoServiceMongo.getAllTodos("user1");

    await todoServiceMongo.deleteAllTodos("user1");
    const todosAfterDeletion = await todoServiceMongo.getAllTodos("user1");

    expect(todosBeforeDeletion).toHaveLength(2);
    expect(todosAfterDeletion).toHaveLength(0);
  });
});

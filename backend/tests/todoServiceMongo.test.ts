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
  it("should return the correct todo when given a valid id and matching userId", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();

    const todo = await todoServiceMongo.getTodoById(id, "user1");
    if (!todo) {
      throw new Error("Test setup error: expected Todo not returned");
    }

    expect(todo.name).toBe("Build a Todo App");
    expect(todo.completed).toBe(false);
    expect(todo.userId).toBe("user1");
  });

  it("should throw an error when the user does not own the todo", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }
    const id = existingTodo._id.toString();

    await expect(todoServiceMongo.getTodoById(id, "user2")).rejects.toThrow(
      "Not authorized to access this todo"
    );
  });

  it("should throw an error when todo with the given id does not exist", async () => {
    const nonExistingId = "68272e369206bfc8869e7cd2";

    await expect(
      todoServiceMongo.getTodoById(nonExistingId, "user1")
    ).rejects.toThrow("Todo not found!");
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
  it("should delete the todo if user owns it", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();

    const deletedTodo = await todoServiceMongo.deleteTodo(id, "user1");
    if (!deletedTodo) {
      throw new Error(`Test error: Deleted todo is null`);
    }

    expect(deletedTodo._id.toString()).toBe(id);
  });

  it("should throw an error if user does not own the todo", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();

    await expect(todoServiceMongo.deleteTodo(id, "user2")).rejects.toThrow(
      "Not authorized to access this todo"
    );
  });

  it("should throw an error if todo does not exist", async () => {
    const nonExistingId = "68272e369206bfc8869e7cd2";

    await expect(
      todoServiceMongo.deleteTodo(nonExistingId, "user1")
    ).rejects.toThrow("Todo not found!");
  });
});

describe("deleteAllTodos", () => {
  it("should delete all todos for the given user", async () => {
    const user1TodosBefore = await todoServiceMongo.getAllTodos("user1");

    await todoServiceMongo.deleteAllTodos("user1", "user1");
    const user1TodosAfter = await todoServiceMongo.getAllTodos("user1");

    expect(user1TodosBefore).toHaveLength(2);
    expect(user1TodosAfter).toHaveLength(0);
  });

  it("should not delete todos of other user", async () => {
    await expect(
      todoServiceMongo.deleteAllTodos("user1", "user2")
    ).rejects.toThrow("Unauthorized access");
  });

  it("should throw an error is userId is missing", async () => {
    // @ts-expect-error intentionally omitting userId for test purposes
    await expect(todoServiceMongo.deleteAllTodos()).rejects.toThrow(
      "Unauthorized: userId is required"
    );
  });
});

describe("updateTodoCompleted", () => {
  it("should allow a user to toggle their own todo's completed status", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();
    const completedBefore = existingTodo.completed;

    const completedAfter = await todoServiceMongo.updateTodoCompleted(
      id,
      "user1"
    );

    expect(completedBefore).toBe(false);
    expect(completedAfter).toBe(true);
  });

  it("should throw an error when trying to toggle a todo not owned by the user", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }
    const id = existingTodo._id.toString();

    await expect(
      todoServiceMongo.updateTodoCompleted(id, "user2")
    ).rejects.toThrow("Unauthorized access");
  });
});

describe("updateTodoName", () => {
  it("should update the todo name when user tries to update a todo that they own", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();
    const newName = "Update name";

    const updatedTodo = await todoServiceMongo.updateTodoName(
      id,
      newName,
      "user1"
    );
    if (!updatedTodo) {
      throw new Error(`Test error: updated Todo not returned`);
    }

    expect(updatedTodo.id).toBe(id);
    expect(updatedTodo.name).toBe(newName);
  });

  it("should throw an error when a user tries to update a todo they do not own", async () => {
    const existingTodo = await Todo.findOne({ name: "Build a Todo App" });
    if (!existingTodo) {
      throw new Error(`Test setup error: Todo ${existingTodo} not found`);
    }

    const id = existingTodo._id.toString();
    const newName = "Update name";

    await expect(
      todoServiceMongo.updateTodoName(id, newName, "user2")
    ).rejects.toThrow("Not authorized to access this todo");
  });
});

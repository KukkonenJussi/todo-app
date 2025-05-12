import todoService from "../src/services/todoService";
import todosData from "../src/mockDb";
import { NewTodoEntry, TodoItem } from "../src/types";

beforeEach(() => {
  todosData.resetTodos();
});

describe("getAllTodos", () => {
  it("returns all todos", () => {
    const mockData = todosData.getTodos();

    const todos = todoService.getAllTodos();

    expect(Array.isArray(todos)).toBe(true);
    expect(todos).toHaveLength(mockData.length);
    expect(todos).toEqual(mockData);
  });

  it("returns only the todos that belong to the specified user", () => {
    const todos = todoService.getAllTodos("12242");

    expect(todos).toHaveLength(1);
  });

  it("does not return todos belonging to other users", () => {
    const correctTodos = todoService.getAllTodos("23321");

    expect(correctTodos.every((todo) => todo.userId === "23321")).toBe(true);
  });

  it("return an empty array if the user has no todos", () => {
    const todos = todoService.getAllTodos("unknown-user");

    expect(todos).toEqual([]);
  });
});

describe("getTodoById", () => {
  it("returns the correct todo when given a valid id", () => {
    const validId = "1";
    const expectedTodo: TodoItem = {
      id: "1",
      userId: "12242",
      name: "Build a Todo App",
      completed: false,
    };

    const response = todoService.getTodoById(validId);

    expect(response).toEqual(expectedTodo);
  });

  it("throws an error when todo with given ID does not exist", () => {
    const invalidId = "invalid-id";

    expect(() => {
      todoService.getTodoById(invalidId);
    }).toThrow(new Error("Todo not found!"));
  });
});

describe("addTodo", () => {
  it("return a new todo item with generated id and default completed status", () => {
    const newTodo: NewTodoEntry = {
      name: "addTodo test",
    };

    const addedTodo = todoService.addTodo(newTodo);

    expect(addedTodo).toHaveProperty("id");
    expect(typeof addedTodo.id).toBe("string");
    expect(addedTodo.name).toBe(newTodo.name);
    expect(addedTodo.completed).toBe(false);
  });

  it("throws an error when a new todo does not have a name", () => {
    const newTodo: NewTodoEntry = {
      name: "",
    };

    expect(() => {
      todoService.addTodo(newTodo);
    }).toThrow(new Error("Name is required!"));
  });

  it("throws an error if name exceeds 50 characters", () => {
    const longName = "a".repeat(51);
    const newTodo: NewTodoEntry = {
      name: longName,
    };

    expect(() => {
      todoService.addTodo(newTodo);
    }).toThrow(new Error("Name must be 50 characters or less!"));
  });

  it("throws an error when a name of a new todo already exists", () => {
    const newTodo: NewTodoEntry = {
      name: "Build a Todo App",
    };

    expect(() => {
      todoService.addTodo(newTodo);
    }).toThrow("Name already exists!");
  });
});

describe("deleteTodo", () => {
  it("deletes the todo with given ID from the todo list", () => {
    const existingId = "1";

    const deletedTodo = todoService.deleteTodo(existingId);
    const allTodos = todoService.getAllTodos();

    expect(allTodos.find((todo) => todo.id === existingId)).toBeUndefined();
    expect(deletedTodo.id).toBe(existingId);
  });

  it("throws an error if the todo with given ID does not exist", () => {
    const invalidId = "id-that-does-not-exist";

    expect(() => {
      todoService.deleteTodo(invalidId);
    }).toThrow("Todo not found!");
  });

  describe("deleteAllTodos", () => {
    it("deletes all todos from the todo list", () => {
      todoService.deleteAllTodos();

      const remainingTodos = todoService.getAllTodos();

      expect(remainingTodos).toHaveLength(0);
    });

    it("throws an error if attempting to delete todos when list is already empty", () => {
      todoService.deleteAllTodos();

      expect(() => {
        todoService.deleteAllTodos();
      }).toThrow("Todo list already empty!");
    });
  });

  describe("updateTodoName", () => {
    it("updates the name of the todo with the given ID and preserver the completed status", () => {
      const id = "2";
      const originalTodo = todoService.getTodoById(id);
      const originalCompleted = originalTodo.completed;
      const newName = "Updated name";

      const updatedTodo = todoService.updateTodoName(id, newName);

      expect(updatedTodo.id).toBe(id);
      expect(updatedTodo.name).toBe(newName);
      expect(updatedTodo.completed).toBe(originalCompleted);
    });

    it("throws an error when the name already exists", () => {
      const idToUpdate = "3";
      const existingName = "Learn TDD while doing this project";

      expect(() => {
        todoService.updateTodoName(idToUpdate, existingName);
      }).toThrow(new Error("Name already exists!"));
    });
  });

  describe("updateTodoCompleted", () => {
    it("updates the completed status", () => {
      const id = "2";
      const originalTodo = { ...todoService.getTodoById(id) };

      const changedCompleted = todoService.updateTodoCompleted(id);

      expect(originalTodo.completed).toBe(false);
      expect(changedCompleted.completed).toBe(true);
    });
  });
});

import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { TodoItem } from "../../types";
import todoService from "../todoService";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

vi.mock('axios')

describe("getAllTodos", async () => {
  it("should fetch all todos successfully", async () => {
    const mockTodos: TodoItem[] = [
      {
        id: "1",
        name: "Build a Todo App",
        completed: false,
      },
      {
        id: "2",
        name: "Learn TDD while doing this project",
        completed: false,
      }
    ];
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockTodos });

    const result = await todoService.getAllTodos();

    expect(result).toEqual(mockTodos);
    expect(axios.get).toHaveBeenCalled();
  });
});

describe("updateTodoCompleted", async () => {
  it("should update the status of a todo successfully", async () => {
    const originalTodo: TodoItem = {
      id: "1",
      name: "Lunch time!",
      completed: false,
    };

    const updatedTodo: TodoItem = {
      ...originalTodo,
      completed: true,
    };

    vi.mocked(axios.patch).mockResolvedValueOnce({ data: updatedTodo });

    const result = await todoService.updateTodoCompleted(originalTodo.id);

    expect(axios.patch).toHaveBeenCalledWith(
      `${apiBaseUrl}/todos/${originalTodo.id}/completed`
    );
    expect(result).toEqual(updatedTodo);
    expect(result.completed).toBe(true);
  });
});

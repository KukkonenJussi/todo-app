import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { TodoItem } from "../../types";
import todoService from "../todoService";

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
    expect(axios.get).toHaveBeenCalled()
  });
});

import todoService from "../src/services/todoService";
import todosData from "../src/mockDb";

describe("getAllTodos", () => {
  it("returns all todos", async () => {
    const mockData = todosData

    const todos = todoService.getAllTodos()

    expect(Array.isArray(todos)).toBe(true)
    expect(todos).toHaveLength(mockData.length)
    expect(todos).toEqual(mockData)
  });
})
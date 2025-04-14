import todoService from "../src/services/todoService";
import todosData from "../src/mockDb";
import { NewTodoEntry } from "../src/types";

describe("getAllTodos", () => {
  it("returns all todos", async () => {
    const mockData = todosData

    const todos = todoService.getAllTodos()

    expect(Array.isArray(todos)).toBe(true)
    expect(todos).toHaveLength(mockData.length)
    expect(todos).toEqual(mockData)
  });
})

describe("addTodo", () => {
  it("return a new todo item with generated id and default completed status", async () => {
    const newTodo: NewTodoEntry = {
      name: "addTodo test",
    }
   
    const addedTodo = todoService.addTodo(newTodo)

    expect(addedTodo).toHaveProperty('id')
    expect(typeof addedTodo.id).toBe('string')
    expect(addedTodo.name).toBe(newTodo.name)
    expect(addedTodo.completed).toBe(false)
  });
})
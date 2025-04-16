import todosData from "../mockDb";
import { TodoItem, NewTodoEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

const todos: TodoItem[] = todosData;

const getAllTodos = (): TodoItem[] => {
  return todos;
};

const getTodoById = (id: string) => {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
};

const addTodo = (todo: NewTodoEntry): TodoItem => {
  const trimmedName = todo.name.trim();

  if (trimmedName === "") {
    throw new Error("Name is required!");
  }

  const nameExists = todos.some((todo) => todo.name === trimmedName);
  if (nameExists) {
    throw new Error("Name already exists!");
  }

  const newTodo = {
    id: uuidv4(),
    name: trimmedName,
    completed: false,
  };

  todos.push(newTodo);
  return newTodo;
};

const deleteTodo = (id: string): TodoItem => {
  const todoToDelete = todos.findIndex((todo) => todo.id === id);

  if (todoToDelete === -1) {
    throw new Error("Todo not found!");
  }

  const deletedTodo = todos.splice(todoToDelete, 1)[0];
  return deletedTodo;
};

export default { getAllTodos, addTodo, deleteTodo, getTodoById };

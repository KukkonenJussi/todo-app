import todosData from "../mockDb";
import { TodoItem, NewTodoEntry } from "../types";
import { parseName } from "../utils/validators";
import { v4 as uuidv4 } from "uuid";

const todos: TodoItem[] = todosData;

const getAllTodos = (): TodoItem[] => {
  return todos;
};

const getTodoById = (id: string) => {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    throw new Error("Todo not found!");
  }

  return todo;
};

const addTodo = (todo: NewTodoEntry): TodoItem => {
  const trimmedName = parseName(todo.name);

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

const updateTodoName = (id: string, name: string): TodoItem => {
  const todoToUpdate = todos.find((todo) => todo.id === id);

  if (!todoToUpdate) {
    throw new Error("Todo not found!");
  }

  const trimmedName = parseName(name);
  const nameExists = todos.some(
    (todo) => todo.name === trimmedName && todo.id !== id
  );

  if (nameExists) {
    throw new Error("Name already exists!");
  }

  todoToUpdate.name = trimmedName;

  return todoToUpdate;
};

export default {
  getAllTodos,
  addTodo,
  deleteTodo,
  getTodoById,
  updateTodoName,
};

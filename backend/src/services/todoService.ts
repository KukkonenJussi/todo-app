import todosData from "../mockDb";
import { TodoItem, NewTodoEntry } from "../types";
import { parseName } from "../utils/validators";
import { v4 as uuidv4 } from "uuid";

const getAllTodos = (): TodoItem[] => {
  return todosData.getTodos();
};

const getTodoById = (id: string): TodoItem => {
  const todo = todosData.getTodos().find((todo) => todo.id === id);
  if (!todo) throw new Error("Todo not found!");
  return todo;
};

const addTodo = (todo: NewTodoEntry): TodoItem => {
  const trimmedName = parseName(todo.name);
  const todos = todosData.getTodos();

  if (todos.some((t) => t.name.toLowerCase() === trimmedName.toLowerCase())) {
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
  const todos = todosData.getTodos();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) throw new Error("Todo not found!");

  return todos.splice(index, 1)[0];
};

const deleteAllTodos = () => {
  const todos = todosData.getTodos();

  if (todos.length === 0) throw new Error("Todo list already empty!");

  return todos.splice(0, todos.length);
};

const updateTodoName = (id: string, name: string): TodoItem => {
  const todos = todosData.getTodos();
  const todoToUpdate = todos.find((todo) => todo.id === id);

  if (!todoToUpdate) throw new Error("Todo not found!");

  const trimmedName = parseName(name);
  const nameExists = todos.some(
    (t) => t.name.toLowerCase() === trimmedName.toLowerCase() && t.id !== id
  );

  if (nameExists) throw new Error("Name already exists!");

  todoToUpdate.name = trimmedName;
  return todoToUpdate;
};

const updateTodoCompleted = (id: string): TodoItem => {
  const todos = todosData.getTodos();
  const todoToUpdate = todos.find((todo) => todo.id === id);

  if (!todoToUpdate) throw new Error("Todo not found!");

  todoToUpdate.completed = !todoToUpdate.completed;

  return todoToUpdate;
};

const resetTodos = () => {
  todosData.resetTodos();
};

export default {
  getAllTodos,
  getTodoById,
  addTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodoName,
  updateTodoCompleted,
  resetTodos,
};

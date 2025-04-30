import axios from "axios";
import { TodoItem, NewTodoItem } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTodos = async () => {
  const response = await axios
    .get<TodoItem[]>(`${apiBaseUrl}/todos`);
  return response.data;
};

export const createTodo = async (object: NewTodoItem) => {
  const response = await axios
    .post<TodoItem>(`${apiBaseUrl}/todos`, object);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios
    .delete<TodoItem>(`${apiBaseUrl}/todos/${id}`);
  return response.data;
};

export const deleteAllTodos = async () => {
  const response = await axios
    .delete<TodoItem[]>(`${apiBaseUrl}/todos`);
  return response.data;
};

export const updateTodo = async (id: string, object: unknown) => {
  const response = await axios
    .put<TodoItem>(`${apiBaseUrl}/todos/${id}`, object);
  return response.data;
};

export default {
  getAllTodos,
  createTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodo,
};

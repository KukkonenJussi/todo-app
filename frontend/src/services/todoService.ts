import axios from "axios";
import { TodoItem, NewTodoItem } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTodos = () => {
  return axios
    .get<TodoItem[]>(`${apiBaseUrl}/todos`)
    .then((response) => response.data);
};

export const createTodo = (object: NewTodoItem) => {
  return axios
    .post<TodoItem>(`${apiBaseUrl}/todos`, object)
    .then((response) => response.data);
};

export const deleteTodo = (id: string) => {
  return axios
    .delete<TodoItem>(`${apiBaseUrl}/todos/${id}`)
    .then((response) => response.data);
};

export const updateTodo = (id: string, object: unknown) => {
  return axios
    .put<TodoItem>(`${apiBaseUrl}/todos/${id}`, object)
    .then((response) => response.data)
};

export default { getAllTodos, createTodo, deleteTodo, updateTodo };
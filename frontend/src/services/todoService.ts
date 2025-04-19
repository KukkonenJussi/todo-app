import axios from "axios";
import { TodoItem } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTodos = () => {
  return axios
    .get<TodoItem[]>(`${apiBaseUrl}/todos`)
    .then((response) => response.data);
};

export default { getAllTodos };
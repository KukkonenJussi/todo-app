import axios from "axios";
import { TodoItemMongoose } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllTodos = async (
  userId: string
): Promise<TodoItemMongoose[]> => {
  const response = await axios.get<TodoItemMongoose[]>(`${apiBaseUrl}/todos`, {
    params: { userId },
  });

  return response.data;
};

export default {
  getAllTodos,
};

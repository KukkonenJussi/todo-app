import { isValidObjectId } from "mongoose";
import Todo from "../models/Todo";
import { NewTodoData } from "../types";
import { parseName } from "../utils/validators";

const getAllTodos = async (userId?: string) => {
  if (userId) {
    return await Todo.find({ userId });
  } else {
    return await Todo.find({});
  }
};

const getTodoById = async (id: string) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error("Todo not found!");
  }

  return todo;
};

const addTodo = async (todo: NewTodoData) => {
  const trimmedName = parseName(todo.name);

  let userId: string;
  if (todo.userId && isValidObjectId(todo.userId)) {
    userId = todo.userId;
  } else {
    userId = "demoUser";
  }

  const newTodo = new Todo({
    name: trimmedName,
    userId: userId || "demoUser",
  });

  await newTodo.save();
  return newTodo;
};

export default { getAllTodos, getTodoById, addTodo };

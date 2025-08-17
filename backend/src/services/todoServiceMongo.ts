import { isValidObjectId } from "mongoose";
import Todo from "../models/Todo";
import { NewTodoData } from "../types";
import { parseName } from "../utils/validators";
import { verifyOwnership } from "../utils/authUtils";

const getAllTodos = async (userId?: string) => {
  if (userId) {
    return await Todo.find({ userId });
  } else {
    return await Todo.find({});
  }
};

const getTodoById = async (id: string, userId: string) => {
  const todo = await Todo.findById(id);

  verifyOwnership(todo, userId);

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

const deleteTodo = async (id: string, userId: string) => {
  const todo = await Todo.findById(id);

  verifyOwnership(todo, userId);

  const deletedTodo = await Todo.findByIdAndDelete(id);

  return deletedTodo;
};

const deleteAllTodos = async (
  requestingUserId: string,
  targetUserId: string
) => {
  if (!requestingUserId || !targetUserId) {
    throw new Error(`Unauthorized: userId is required`);
  }

  if (requestingUserId !== targetUserId) {
    throw new Error(`Unauthorized access`);
  }

  await Todo.deleteMany({ userId: targetUserId });
};

const updateTodoCompleted = async (id: string, userId: string) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error(`Todo not found`);
  }

  if (todo.userId !== userId) {
    throw new Error(`Unauthorized access`);
  }

  return !todo.completed;
};

const updateTodoName = async (id: string, newName: string, userId: string) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error(`Todo not found`);
  }

  if (todo.userId !== userId) {
    throw new Error(`Unauthorized access`);
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { name: newName },
    { new: true }
  );

  return updatedTodo;
};

export default {
  getAllTodos,
  getTodoById,
  addTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodoCompleted,
  updateTodoName,
};

import Todo from "../models/Todo";
import { NewTodoData } from "../types";

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
  const newTodo = new Todo({
    name: todo.name,
  });

  await newTodo.save();
  return newTodo;
};

export default { getAllTodos, getTodoById, addTodo };

import Todo from "../models/Todo";

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

export default { getAllTodos, getTodoById };

import Todo from "../models/Todo";

const getAllTodos = async () => {
  return await Todo.find({});
};

export default { getAllTodos };

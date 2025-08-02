import { isString } from "./validators";

type TodoWithUserId = {
  userId?: unknown;
};

export const verifyOwnership = (
  todo: TodoWithUserId | null,
  userId: string
) => {
  if (!todo) {
    throw new Error("Todo not found!");
  }

  const todoUserId = isString(todo.userId)
    ? todo.userId
    : todo.userId?.toString?.();

  if (todoUserId !== userId) {
    throw new Error("Not authorized to access this todo");
  }
};

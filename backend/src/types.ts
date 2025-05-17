export interface TodoItem {
  id: string;
  userId?: string;
  name: string;
  completed: boolean;
}

export type NewTodoEntry = Pick<TodoItem, "name">;

export interface TodoData {
  _id: string;
  name: string;
  completed: boolean;
  userId?: string;
}

export type NewTodoData = Pick<TodoData, "name" | "userId">;

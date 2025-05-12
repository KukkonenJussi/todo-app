export interface TodoItem {
  id: string;
  userId?: string
  name: string;
  completed: boolean;
}

export type NewTodoEntry = Pick<TodoItem, "name">;

export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export type NewTodoEntry = Omit<TodoItem, "id" | "completed">;

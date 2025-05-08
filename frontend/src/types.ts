export interface ErrorResponse {
  error: string;
}

export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export type NewTodoItem = Pick<TodoItem, "name">;

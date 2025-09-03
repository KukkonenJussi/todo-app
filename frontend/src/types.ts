export interface ErrorResponse {
  error: string;
}

export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface TodoItemMongoose extends TodoItem {
  userId: string;
}

export type NewTodoItem = Pick<TodoItem, "name">;
export type NewMongooseTodoItem = Pick<TodoItemMongoose, "name" | "userId">;

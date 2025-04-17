import { TodoItem } from "./types";

let todos: TodoItem[] = [
  { id: "1", name: "Build a Todo App", completed: false },
  { id: "2", name: "Learn TDD while doing this project", completed: false },
  { id: "3", name: "Remember to have a break", completed: true },
];

const getTodos = () => todos;

const resetTodos = () => {
  todos = [
    { id: "1", name: "Build a Todo App", completed: false },
    { id: "2", name: "Learn TDD while doing this project", completed: false },
    { id: "3", name: "Remember to have a break", completed: true },
  ];
};

export default {
  getTodos,
  resetTodos,
};

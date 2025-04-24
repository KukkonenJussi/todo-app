import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList", () => {
  it("renders a list of todo items passed as props", () => {
    const todos = [
      {
        id: "1",
        name: "Build a Todo App",
        completed: false,
      },
      {
        id: "2",
        name: "Learn TDD while doing this project",
        completed: false,
      },
      {
        id: "3",
        name: "Remember to have a break",
        completed: true,
      },
    ];

    render(<TodoList todos={todos} onDelete={() => {}} onUpdate={() => {}} />);

    todos.forEach((todo) => {
      expect(screen.getByText(todo.name)).toBeDefined();
    });
  });
});

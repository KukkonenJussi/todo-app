import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoListItem from "../todo/TodoListItem";

const todo = {
  id: "1",
  name: "Build a Todo App",
  completed: false,
};

describe("TodoListItem", () => {
  it("renders the todo name passed as prop", () => {
    render(
      <TodoListItem
        todoItem={todo}
        onDelete={() => {}}
        onUpdate={() => {}}
        onCompletedUpdate={() => {}}
      />
    );

    const todoNameElement = screen.getByText(/build a todo app/i);
    expect(todoNameElement).toBeDefined();
  });

  it("renders the delete icon", () => {
    render(
      <TodoListItem
        todoItem={todo}
        onDelete={() => {}}
        onUpdate={() => {}}
        onCompletedUpdate={() => {}}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /delete todo/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it("renders the edit icon", () => {
    render(
      <TodoListItem
        todoItem={todo}
        onDelete={() => {}}
        onUpdate={() => {}}
        onCompletedUpdate={() => {}}
      />
    );

    const editButton = screen.getByRole("button", {
      name: /edit todo/i,
    });
    expect(editButton).toBeInTheDocument();
  });

  it("renders the check icon", () => {
    render(
      <TodoListItem
        todoItem={todo}
        onDelete={() => {}}
        onUpdate={() => {}}
        onCompletedUpdate={() => {}}
      />
    );

    const toggleStatusButton = screen.getByRole("button", {
      name: /change completed status/i,
    });
    expect(toggleStatusButton).toBeInTheDocument();
  });
});

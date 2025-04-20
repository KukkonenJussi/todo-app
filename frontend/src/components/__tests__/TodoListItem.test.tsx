import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoListItem from "../TodoListItem";

describe("TodoList", () => {
  it("renders the todo name passed as prop", () => {
    const todo = {
      id: "1",
      name: "Build a Todo App",
      completed: false,
    };

    render(<TodoListItem todoItem={todo}/>);

    const element = screen.getByText('Build a Todo App')
    expect(element).toBeDefined()
  });
});

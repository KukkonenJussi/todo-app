import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import AddTodoForm from "../todo/AddTodoForm";
import AddTodoForm from "../todo/AddTodoForm";

describe("AddTodoForm", () => {
  it("calls onSubmit with correct input and clears input", async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    render(<AddTodoForm onSubmit={mockHandler} />);
    const inputField = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(inputField, "Today was a good day!");
    await user.click(addButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(inputField).toHaveValue("");
  });
});

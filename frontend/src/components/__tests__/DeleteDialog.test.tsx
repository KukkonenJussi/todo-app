import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteDialog from "../DeleteDialog";
import { TodoItem } from "../../types";

describe("DeleteDialog", () => {
  it("renders correct delete message and handles cancel/confirm", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();
    const mockTodo: TodoItem = { id: "2", name: "Test Todo", completed: false };

    render(
      <DeleteDialog
        open={true}
        todo={mockTodo}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText("Delete Todo 'Test Todo'?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});

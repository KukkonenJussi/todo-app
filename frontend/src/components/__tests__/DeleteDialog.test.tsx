import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteDialog from "../dialogs/DeleteDialog";
import { TodoItem } from "../../types";

describe("DeleteDialog", () => {
  const user = userEvent.setup();
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const mockTodo: TodoItem = { id: "2", name: "Test Todo", completed: false };

  it("renders title, message and buttons", async () => {
    render(
      <DeleteDialog
        open={true}
        todo={mockTodo}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const title = screen.getByRole("heading", { name: "Delete confirmation" });
    const message = screen.getByText('Delete Todo \'Test Todo\'?')
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  });

  it("renders correct delete message and handles cancel/confirm", async () => {
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

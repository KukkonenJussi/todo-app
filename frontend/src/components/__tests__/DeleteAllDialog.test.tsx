import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DeleteAllDialog from "../dialogs/DeleteAllDialog";

describe("DeleteDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  it("renders title, message and buttons", async () => {
    render(
      <DeleteAllDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const title = screen.getByRole("heading", { name: "Delete confirmation" });
    const message = screen.getByText("Delete all todos?");
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

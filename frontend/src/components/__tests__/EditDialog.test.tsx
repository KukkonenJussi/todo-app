import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EditDialog from "../dialogs/EditDialog";

describe("EditDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const mockOnNameChange = vi.fn();

  it("renders title, input field and buttons", async () => {
    render(
      <EditDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        editedName="Go outside and catch some air"
        onNameChange={mockOnNameChange}
      />
    );
    
    const editTitle = screen.getByRole('heading', { name: 'Edit Todo name' })
    const inputField= screen.getByRole('textbox', { name: 'Todo name' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    const saveButton = screen.getByRole('button', { name: 'Save' })

    expect(editTitle).toBeInTheDocument()
    expect(inputField).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  });

  it("renders Todo with given name", async () => {
    render(
      <EditDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        editedName="Go outside and catch some air"
        onNameChange={mockOnNameChange}
      />
    );

    const inputField = screen.getByRole('textbox', { name: 'Todo name' })
    expect(inputField).toHaveValue("Go outside and catch some air");
  });
});

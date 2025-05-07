import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Notification from "../Notification";

enum Message {
  NameRequired = "Name is required!",
  ListDeleted = "Todos deleted succesfully!",
  NameExists = "Name already exists!",
}

describe("Notification", () => {
  it("renders nothing when message is null", () => {
    render(<Notification message={null} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders a close button when message is shown", () => {
    render(<Notification message={Message.NameRequired} />);

    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  });

  it("shows a success notification when message includes 'successfully'", () => {
    render(<Notification message={Message.ListDeleted} />);

    const element = screen.getByTestId("notification-success");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Todos deleted succesfully!");
  });

  it("shows a warning notification when message includes 'required'", () => {
    render(<Notification message={Message.NameRequired} />);

    const element = screen.getByTestId("notification-warning");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Name is required!");
  });

  it("shows an error notification when message includes 'exists'", () => {
    render(<Notification message={Message.NameExists} />);

    const element = screen.getByTestId("notification-error");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Name already exists!");
  });
});

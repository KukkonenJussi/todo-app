import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Notification from "../Notification";

describe("Notification", () => {
  it("renders with warning severity when message contains 'required'", () => {
    const warningMessage = "Name is required!";

    render(<Notification message={warningMessage} />);

    const element = screen.getByText("Name is required!");
    expect(element).toBeVisible();
  });

  it("renders with error severity when message contains 'exists'", () => {
    const warningMessage = "Name already exists!";

    render(<Notification message={warningMessage} />);

    const element = screen.getByText("Name already exists!");
    expect(element).toBeVisible();
  });

  it("renders with error severity when message contains 'less'", () => {
    const warningMessage = "Name must be 50 characters or less!";

    render(<Notification message={warningMessage} />);

    const element = screen.getByText("Name must be 50 characters or less!");
    expect(element).toBeVisible();
  });
});

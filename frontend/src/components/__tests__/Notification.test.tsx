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
});

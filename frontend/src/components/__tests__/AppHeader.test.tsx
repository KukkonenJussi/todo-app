import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AppHeader from "../header/AppHeader";

describe("Header", () => {
  it("renders the header title", () => {
    render(<AppHeader onDelete={() => {}} toggleDarkMode={() => {}} />);

    const element = screen.getByText(/todo app/i);
    expect(element).toBeInTheDocument();
  });

  it("renders the dark mode button", () => {
    render(<AppHeader onDelete={() => {}} toggleDarkMode={() => {}} />);

    const element = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });

    expect(element).toBeInTheDocument();
  });

  it("renders the menu icon", () => {
    render(<AppHeader onDelete={() => {}} toggleDarkMode={() => {}} />);

    const element = screen.getByRole("button", {
      name: /open menu/i,
    });

    expect(element).toBeInTheDocument();
  });
});

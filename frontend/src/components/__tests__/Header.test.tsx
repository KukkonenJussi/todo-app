import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders the header text", () => {
    const header = "Todo App";

    render(<Header header={header} />);

    const element = screen.getByText("Todo App");
    expect(element).toBeDefined()
  });
});

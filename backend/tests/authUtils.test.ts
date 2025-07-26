import { verifyOwnership } from "../src/utils/authUtils";

describe("verifyOwnership", () => {
  it("should throw error if todo does not exist", () => {
    expect(() => verifyOwnership(null, "user1")).toThrow("Todo not found!");
  });
  it("should throw error if todo belongs to anohter user", () => {
    const todo = { userId: "user2" };
    expect(() => verifyOwnership(todo, "user1")).toThrow(
      "Not authorized to access this todo"
    );
  });
  it("should not throw if todo belongs to the user", () => {
    const todo = { userId: "user1" };
    expect(() => verifyOwnership(todo, "user1")).not.toThrow();
  });
});

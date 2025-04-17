import { parseName } from "../src/utils/validators";

describe("parseName", () => {
    it("returns trimmed name when input is valid", () => {
        const input = "  Lunch time  "
        const result = parseName(input)
        expect(result).toBe("Lunch time")
    });

    it("throws an error if name is empty", () => {
        expect(() => {
            parseName("")
        }).toThrow("Name is required!")
    });

    it("throws an error if name exceeds 50 characters", () => {
        const longName = "a".repeat(51)
        expect(() => {
            parseName(longName)
        }).toThrow("Name must be 50 characters or less!")
    });
})
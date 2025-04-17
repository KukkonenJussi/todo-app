import { parseName } from "../src/utils/validators";

describe("parseName", () => {
    it("throws an error if name is empty", () => {
        expect(() => {
            parseName("")
        }).toThrow("Name is required!")
    });
})
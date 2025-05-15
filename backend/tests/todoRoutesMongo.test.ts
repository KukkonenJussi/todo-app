import request from "supertest";
import app from "../src/app";
import { setupTestDatabase } from "./mongoTestSetup";

setupTestDatabase();

describe("GET /todos", () => {
  it("returns status code 200 and all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

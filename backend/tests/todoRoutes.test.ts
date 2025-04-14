import request from "supertest";
import app from "../src/app";

describe("GET /todos", () => {
  it("returns status code 200 and all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  // it('returns status code 200 and only completed todos', async () => {

  // })

  // it('returns status code 200 and only uncompleted todos', async () => {

  // })
});

// describe('DELETE /todos', () => {
//     it('returns status code 200 when deleting a single todo', async () => {

//     })

//     it('returns status code 200 when deleting all todos', async () => {

//     })
// })

describe("POST /todos", () => {
  it("returns status code 201 when creating a valid todo with default completed value", async () => {
    const newTodo = {
      name: "Write a test",
    };

    const response = await request(app).post("/todos").send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newTodo.name);
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toBeDefined();
    expect(typeof response.body.id).toBe("string");
  });

  // it('returns status code 400 when creating an empty todo', async () => {

  // })

  // it('returns status code 409 when creating a duplicate todo', async () => {

  // })

  // it('returns status code 400 when creating a todo with too many characters', async () => {

  // })
});

// describe('PUT /todos', () => {
//     it('returns status code 200 when editing a todo', async () => {

//     })

//     it('returns status code 200 when marking a todo as done', async () => {

//     })
// })

import request from "supertest";
import app from "../src/app";
import { NewTodoEntry } from "../src/types";

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

  it('returns status code 400 when creating an empty todo', async () => {
    const emptyTodo: NewTodoEntry = {
      name: ""
    }

    const response = await request(app).post("/todos").send(emptyTodo)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Name is required!")
  })

  it('returns status code 409 when creating a duplicate todo', async () => {
    const duplicateTodo: NewTodoEntry = {
      name: "Build a Todo App"
    }

    const response = await request(app).post("/todos").send(duplicateTodo)

    expect(response.status).toBe(409)
    expect(response.body.error).toBe("Name already exists!")
  })


  // expect(() => {
  //       todoService.addTodo(newTodo)
  //     }).toThrow("Name already exists!")

  // it('returns status code 400 when creating a todo with too many characters', async () => {

  // })
});

// describe('PUT /todos', () => {
//     it('returns status code 200 when editing a todo', async () => {

//     })

//     it('returns status code 200 when marking a todo as done', async () => {

//     })
// })

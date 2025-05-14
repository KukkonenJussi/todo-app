import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "../src/models/Todo";
import todoServiceMongo from "../src/services/todoServiceMongo";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI!);
  //   console.log("Used database: ", mongoose.connection.db?.databaseName);
});

beforeEach(async () => {
  await Todo.deleteMany({});
  await Todo.insertMany([
    {
      name: "Build a Todo App",
      completed: false,
    },
    {
      name: "Learn TDD while doing this project",
      completed: false,
    },
    {
      name: "Remember to have a break",
      completed: true,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("getAllTodos returns all todos", async () => {
  const todos = await todoServiceMongo.getAllTodos();
  expect(todos).toHaveLength(3);
  expect(todos[0].name).toBe("Build a Todo App");
});

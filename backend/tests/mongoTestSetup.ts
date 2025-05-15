import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import Todo from "../src/models/Todo";

let mongoServer: MongoMemoryServer;

export const setupTestDatabase = () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // start a memory-based mongo-instance
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async () => {
    await Todo.deleteMany({});
    await Todo.insertMany([
      {
        name: "Build a Todo App",
        completed: false,
        userId: "user1",
      },
      {
        name: "Learn TDD while doing this project",
        completed: false,
        userId: "user1",
      },
      {
        name: "Remember to have a break",
        completed: true,
        userId: "user2",
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.close(); // close mongoose and stop the memory-based database (mongo-instance)
    await mongoServer.stop();

    // await closeDatabaseConnection();
  });
};

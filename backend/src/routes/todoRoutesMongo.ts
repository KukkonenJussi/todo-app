import express from "express";
import dotenv from "dotenv";

import todoServiceMongo from "../services/todoServiceMongo";
import { NewTodoData } from "../types";

const router = express.Router();

dotenv.config();

router.get("/", async (request, response) => {
  try {
    const userId =
      typeof request.query.userId === "string"
        ? request.query.userId
        : undefined;
    const todos = await todoServiceMongo.getAllTodos(userId);
    response.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    response.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userId =
      typeof request.query.userId === "string"
        ? request.query.userId
        : "demoUser";

    const todo = await todoServiceMongo.getTodoById(id, userId);

    response.status(200).json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Not authorized to access this todo") {
        response.status(403).send({ error: error.message });
        return;
      }
      if (error.message === "Todo not found!") {
        response.status(404).send({ error: error.message });
        return;
      }
      response.status(400).send({ error: error.message });
      return;
    }
    response.status(400).send({ error: "unknown error" });
    return;
  }
});

router.post("/", async (request, response) => {
  try {
    const body = request.body as NewTodoData;

    const todo = await todoServiceMongo.addTodo({
      name: body.name,
      userId: body.userId,
    });

    response.status(201).json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Name is required!") {
        response.status(400).send({ error: error.message });
        return;
      }
    }
    response.status(400).send({ error: "unknown error" });
    return;
  }
});

export default router;

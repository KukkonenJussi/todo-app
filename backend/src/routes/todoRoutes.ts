import express from "express";
import todoService from "../services/todoService";
import { parseName } from "../utils";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(todoService.getAllTodos());
});

router.post("/", (request, response) => {
  try {
    const name = parseName(request.body.name);
    const newTodo = todoService.addTodo({ name });
    response.status(201).json(newTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).send({ error: error.message });
    } else {
      response.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;

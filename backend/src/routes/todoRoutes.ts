import express from "express";
import todoService from "../services/todoService";
import { parseName } from "../utils";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(todoService.getAllTodos());
});

router.get("/:id", (request, response) => {
  try {
    const id = request.params.id
    const todo = todoService.getTodoById(id)
    response.status(200).json(todo)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Todo not found!") {
      response.status(404).send({ error: error.message })
    }
  }
});

router.post("/", (request, response) => {
  try {
    const name = parseName(request.body.name);
    const newTodo = todoService.addTodo({ name });
    response.status(201).json(newTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error instanceof Error && error.message === "Name already exists!") {
        response.status(409).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const todoToDelete = request.params.id
    const deletedTodo = todoService.deleteTodo(todoToDelete)
    response.status(200).json(deletedTodo)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Todo not found!") {
      response.status(404).send({ error: error.message })
    }
  }
})

export default router;

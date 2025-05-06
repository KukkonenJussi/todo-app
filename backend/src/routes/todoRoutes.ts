import express from "express";
import todoService from "../services/todoService";
import { parseName } from "../utils/validators";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(todoService.getAllTodos());
});

router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    const todo = todoService.getTodoById(id);
    response.status(200).json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Todo not found!") {
        response.status(404).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.post("/", (request, response) => {
  try {
    const body = request.body as { name: unknown };
    const parsedName = parseName(body.name);
    const newTodo = todoService.addTodo({ name: parsedName });
    response.status(201).json(newTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Name already exists!") {
        response.status(409).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.post("/reset", (_request, response) => {
  try {
    todoService.resetTodos();
    response.status(204).end();
  } catch {
    response.status(500).json({ error: "Failed to reset todos" });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const todoToDelete = request.params.id;
    const deletedTodo = todoService.deleteTodo(todoToDelete);
    response.status(200).json(deletedTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Todo not found!") {
        response.status(404).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.delete("/", (_request, response) => {
  try {
    const deleteAllResponse = todoService.deleteAllTodos();
    response.status(200).json(deleteAllResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Todo list already empty!") {
        response.status(400).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.put("/:id", (request, response) => {
  try {
    const todoToUpdate = request.params.id;
    const body = request.body as { name: unknown };
    const updatedName = parseName(body.name);
    const updateResponse = todoService.updateTodoName(
      todoToUpdate,
      updatedName
    );
    response.status(200).json(updateResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Name already exists!") {
        response.status(409).send({ error: error.message });
      }
      response.status(400).send({ error: error.message });
    }
    response.status(400).send({ error: "unknown error" });
  }
});

router.patch("/:id/completed", (request, response) => {
  try {
    const id = request.params.id;
    const updatedTodo = todoService.updateTodoCompleted(id);
    response.status(200).json(updatedTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message });
    } else {
      response.status(400).json({ error: "Unknown error" });
    }
  }
});

export default router;

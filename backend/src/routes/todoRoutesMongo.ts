import express from "express";
import dotenv from "dotenv";

import todoServiceMongo from "../services/todoServiceMongo";

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

export default router;

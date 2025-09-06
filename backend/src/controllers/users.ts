import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { createUserBody } from "../types";

const router = express.Router();

router.post("/", async (request, response) => {
  const { username, name, password } = request.body as createUserBody;

  const saltRounds = 10;
  const passwordhash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordhash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default router;

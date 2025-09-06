import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

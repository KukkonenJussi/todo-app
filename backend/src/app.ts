import express from "express";
import todoRoute from "./routes/todoRoutes";
import cors from "cors";

const helmet = require("helmet");
const app = express();
const corsOptions = {
  origin: "https://todo-app-seven-omega-40.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/todos", todoRoute);

export default app;

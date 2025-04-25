import express from "express";
import todoRoute from "./routes/todoRoutes";
import cors from "cors";
import slowDown from "express-slow-down";

const helmet = require("helmet");
const app = express();
const corsOptions = {
  origin: "https://todo-app-seven-omega-40.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const slowLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  maxDelayMs: 5 * 1000,
  message: "Too many requests, please slow down!",
});

app.use(cors(corsOptions));
app.use(helmet());
app.use(slowLimiter);
app.use(express.json());

app.use("/todos", todoRoute);

export default app;

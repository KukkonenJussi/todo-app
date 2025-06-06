import express from "express";
import cors from "cors";
import helmet from "helmet";
import slowDown from "express-slow-down";

import todoRoute from "./routes/todoRoutes";
import todoRouteMongo from "./routes/todoRoutesMongo";

const app = express();
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

const slowLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  maxDelayMs: 5 * 1000,
  message: "Too many requests, please slow down!",
});

app.use(cors(corsOptions));
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(slowLimiter);
}

app.use(express.json());

if (process.env.NODE_ENV === "test-mongo") {
  app.use("/todos", todoRouteMongo);
} else {
  app.use("/todos", todoRoute);
}

export default app;

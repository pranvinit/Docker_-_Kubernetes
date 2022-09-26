import express from "express";
import cookieParser from "cookie-parser";
require("express-async-errors");
export const app = express();

// Routers imports
import { authRouter } from "./routes/authRoutes";

// Middleware imports
import { errorHandlerMiddleware } from "./middlewares/error-handler";

app.use(express.json());

app.get("", (req, res) => {
  res.send("auth service is working");
});

// Setting routers
app.use("/api/auth", authRouter);
app.use(cookieParser()); // Do not encrypt because it uses node specific encryption algorithms

// Setting error-handler middleware
app.all("*", errorHandlerMiddleware);

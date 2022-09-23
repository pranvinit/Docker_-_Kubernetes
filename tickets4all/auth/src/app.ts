import express from "express";
import { connectDB } from "./db/connect";
require("express-async-errors");
const app = express();
const port = process.env.PORT || 5000;

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

// Setting error-handler middleware
app.all("*", errorHandlerMiddleware);

app.listen(port, async () => {
  await connectDB();
  console.log("Connected to postgres database");
  console.log(`Auth service running on port ${port}`);
});

require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");

const port = process.env.PORT || 6000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["POST"],
  })
);

app.get("", (req, res) => {
  res.send("test 2 is running.");
});

app.post("/event", (req, res) => {
  const { type, message } = req.body;
  if (type === "serviceStart") {
    console.log(message);
  }

  res.send("Recieved an event message.");
});

app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`));

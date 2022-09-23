require("express-async-errors");

const express = require("express");
const app = express();
const axios = require("axios");
const errorHandler = require("./middlewares/error-handler");

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  await axios.post("http://testtwo-srv:6000/event", {
    type: "serviceStart",
    message: "Test service has started",
  });
  res.send("api service is working.");
});

app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`));

const express = require("express");
const app = express();
const cors = require("cors");
const { appendFile } = require("fs/promises");

const port = process.env.PORT || 6000;

app.use(express.json());
app.use(
  cors({
    origin: "http://server-clusterip-service:5000",
    methods: ["POST"],
  })
);

app.get("", (req, res) => {
  res.send("looger is working");
});

app.post("/logger/events", async (req, res) => {
  const { name, idea } = req.body;

  if (!name || !idea) {
    console.log("Name or Idea not received by logger.");
  }

  await appendFile("./logs.txt", `${name}: ${idea}\n`);
  console.log("Idea recieved by api and add to logs.");
  res.status(200).json({ message: "Idea logged to file system." });
});

app.listen(port, console.log(`Server running on port ${port}`));

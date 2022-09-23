const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://ideas.com",
    methods: ["POST"],
  })
);

app.get("", (req, res) => {
  res.send("server is working");
});

app.post("/api/ideas", async (req, res) => {
  const { name, idea } = req.body;

  if (!name || !idea) {
    return res.status(400).send("Name or Idea not received by api.");
  }

  await axios.post("http://logger-clusterip-service:6000/logger/events", {
    name,
    idea,
  });
  console.log("Idea received by client and sent to logger.");

  res.status(200).json({ message: "Idea sent to server successfully." });
});

app.listen(port, console.log(`Server running on port ${port}`));

const express = require("express");
const { buildSystem } = require("./core/factory");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 AI MASTER CONTROL v9 ONLINE");
});

app.get("/build", async (req, res) => {
  const goal = req.query.goal || "basic app";

  const result = await buildSystem(goal);

  res.json(result);
});

app.listen(5000, () => {
  console.log("🚀 v9 running on port 5000");
});

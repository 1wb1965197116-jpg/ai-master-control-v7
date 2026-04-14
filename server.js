const express = require("express");
const { runOrchestrator } = require("./core/orchestrator");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 AI MASTER CONTROL v7 ONLINE");
});

app.get("/run", async (req, res) => {
  const result = await runOrchestrator();
  res.json(result);
});

app.listen(5000, () => {
  console.log("🚀 v7 running on http://localhost:5000");
});

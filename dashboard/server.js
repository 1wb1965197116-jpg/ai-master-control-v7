const express = require("express");
const { runOrchestrator } = require("../core/orchestrator");

const app = express();

app.get("/run-all", async (req, res) => {
  const data = await runOrchestrator();
  res.json(data);
});

app.listen(4000, () => {
  console.log("📊 Dashboard running on :4000");
});

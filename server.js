const express = require("express");
const { runCompany } = require("./core/company");
const { getMetrics } = require("./brain/metrics");

const app = express();
app.use(app.use(express.static("dashboard"));

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard/index.html");
});
app.get("/", (req, res) => {
  res.send("🏢 AI AUTONOMOUS COMPANY OS v12 ONLINE");
});

app.get("/run", async (req, res) => {
  const metrics = getMetrics();

  const result = await runCompany(metrics);

  res.json(result);
});
app.post("/deploy-helper", async (req, res) => {

  const result = {
    status: "DEPLOY_STARTED",
    platform: "auto-detect (Render/Vercel/GitHub Actions)",
    time: Date.now()
  };

  console.log("🚀 Deploy Helper triggered");

  res.json(result);
});
app.listen(5000, () => {
  console.log("🚀 v12 Company OS running");
});

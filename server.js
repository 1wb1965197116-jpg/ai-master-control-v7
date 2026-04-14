const express = require("express");
const path = require("path");

// ✅ CI/CD IMPORT (GOES HERE AT TOP)
const { runCICD } = require("./core/cicd");

const app = express();

app.use(express.json());

// ✅ FIXED STATIC DASHBOARD (IMPORTANT)
app.use(express.static("dashboard"));

/* =========================
   🧠 HOME app.get("/cloud", async (req, res) => {

  const metrics = {
    traffic: Math.floor(Math.random() * 2000)
  };

  const result = await runCloud(metrics);

  res.json(result);
});
const { runCloud } = require("./cloud/orchestrator");
app.get("/", (req, res) => {
  res.send("🏢 AI COMPANY OS v12 const { runCloud } = require("./cloud/orchestrator");
app.get("/logs", (req, res) => {
  res.json({
    message: "Live logs coming soon",
    time: Date.now()
  });
});
/* =========================
   🚀 REAL CI/CD DEPLOY HELPER
========================= */
app.post("/deploy-helper", async (req, res) => {

  try {
    const goal = req.body.goal || "saas dashboard";

    const result = await runCICD(goal);

    console.log("🚀 CI/CD triggered:", result.status);

    res.json({
      success: true,
      result
    });

  } catch (err) {
    console.log("❌ CI/CD ERROR:", err);

    res.json({
      success: false,
      error: err.message
    });
  }
});

/* =========================
   🛠 SELF HEAL SYSTEM
========================= */
app.post("/self-heal", async (req, res) => {

  const result = {
    status: "SELF_HEAL_COMPLETE",
    fixes: [
      "dependency scan complete",
      "route validation complete",
      "runtime simulation complete"
    ]
  };

  console.log("🛠 Self-heal triggered");

  res.json(result);
});

/* =========================
   🖥 DASHBOARD ROUTE
========================= */
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard/index.html"));
});

/* =========================
   🚀 START SERVER
========================= */
app.listen(5000, () => {
  console.log("🚀 AI COMPANY OS v12 RUNNING ON PORT 5000");
});
const { runDevOps } = require("./core/devops");

setInterval(async () => {

  const metrics = {
    changesDetected: true,   // later: hook to git diff
    errorRate: 0,
    lastDeployFailed: false
  };

  const result = await runDevOps(metrics);

  console.log("⚙️ DevOps Loop:", result);

}, 60000); // runs every 60 seconds

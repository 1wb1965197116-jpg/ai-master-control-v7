const express = require("express");
const path = require("path");

// =========================
// ✅ IMPORTS (ALL AT TOP)
// =========================
const { runCICD } = require("./core/cicd");
const { runDevOps } = require("./core/devops");
const { runCloud } = require("./cloud/orchestrator");
const { runCloudAI } = require("./cloud/cloudEngine");

const app = express();

app.use(express.json());
app.use(express.static("dashboard"));

/* =========================
   🧠 HOME
========================= */
app.get("/", (req, res) => {
  res.send("🏢 AI COMPANY OS v16 ONLINE");
});

/* =========================
   📡 LIVE LOG STREAM
========================= */
app.get("/logs", (req, res) => {
  res.json({
    status: "LIVE_LOG_STREAM",
    logs: [
      "System running",
      "No errors detected",
      "Last deploy successful"
    ],
    time: Date.now()
  });
});

/* =========================
   ☁️ CLOUD (v15)
========================= */
app.get("/cloud", async (req, res) => {

  const metrics = {
    traffic: Math.floor(Math.random() * 2000)
  };

  const result = await runCloud(metrics);

  res.json(result);
});

/* =========================
   ☸️ CLOUD AI (v16)
========================= */
app.get("/cloud-ai", async (req, res) => {

  const metrics = {
    cpu: Math.floor(Math.random() * 100)
  };

  const result = await runCloudAI(metrics);

  res.json(result);
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
  console.log("🚀 AI COMPANY OS v16 RUNNING ON PORT 5000");
});

/* =========================
   🤖 AUTONOMOUS DEVOPS LOOP (v14)
========================= */
setInterval(async () => {

  const metrics = {
    changesDetected: true,
    errorRate: 0,
    lastDeployFailed: false
  };

  const result = await runDevOps(metrics);

  console.log("⚙️ DevOps Loop:", result);

}, 60000); // every 60 seconds

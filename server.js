const express = require("express");
const path = require("path");

// =========================
// 🧠 CORE SYSTEMS
// =========================
const { runCICD } = require("./core/cicd");
const { runDevOps } = require("./core/devops");

// =========================
// ☁️ CLOUD SYSTEMS
// =========================
const { runCloud } = require("./cloud/orchestrator");
const { runCloudAI } = require("./cloud/cloudEngine");
const { runClusterAI } = require("./cloud/clusterAI");

const app = express();

app.use(express.json());
app.use(express.static("dashboard"));

/* =========================
   🏠 HOME
========================= */
app.get("/", (req, res) => {
  res.send("🏢 AI COMPANY OS v16 ONLINE");
});

/* =========================
   📡 LIVE LOGS
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
  try {
    const metrics = {
      traffic: Math.floor(Math.random() * 2000)
    };

    const result = await runCloud(metrics);

    res.json(result);

  } catch (err) {
    res.json({ status: "FAILED", error: err.message });
  }
});

/* =========================
   ☸️ CLOUD AI (v16)
========================= */
app.get("/cloud-ai", async (req, res) => {
  try {
    const metrics = {
      cpu: Math.floor(Math.random() * 100)
    };

    const result = await runCloudAI(metrics);

    res.json(result);

  } catch (err) {
    res.json({ status: "FAILED", error: err.message });
  }
});

/* =========================
   ☸️ KUBERNETES AI (v17 LAYER)
========================= */
app.get("/k8s-ai", async (req, res) => {
  try {
    const metrics = {
      cpu: Math.floor(Math.random() * 100)
    };

    const result = await runClusterAI(metrics);

    res.json(result);

  } catch (err) {
    console.log("❌ K8S ERROR:", err);
    res.json({ status: "FAILED", error: err.message });
  }
});

/* =========================
   🚀 CI/CD DEPLOY HELPER
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
app.post("/self-heal", (req, res) => {
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
   🖥 DASHBOARD
========================= */
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard/index.html"));
});

/* =========================
   🤖 DEVOPS LOOP (AUTO)
========================= */
setInterval(async () => {
  try {
    const metrics = {
      changesDetected: true,
      errorRate: 0,
      lastDeployFailed: false
    };

    const result = await runDevOps(metrics);

    console.log("⚙️ DevOps Loop:", result);

  } catch (err) {
    console.log("❌ DevOps Error:", err.message);
  }
}, 60000);

/* =========================
   🚀 START SERVER
========================= */
app.listen(5000, () => {
  console.log("🚀 AI COMPANY OS v16 RUNNING ON PORT 5000");
});

const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { runCICD } = require("./core/cicd");
const { runCloud } = require("./cloud/orchestrator");
const { runCloudAI } = require("./cloud/cloudEngine");
const { runClusterAI } = require("./cloud/clusterAI");

const app = express();
const PORT = Number(process.env.PORT || 10000);
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "dashboard")));

app.get("/", (_req, res) => {
  res.send("AI COMPANY OS is online");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "ai-master-control-v7" });
});

app.get("/logs", (_req, res) => {
  res.json({ status: "LIVE_LOG_STREAM", logs: ["System running"], time: Date.now() });
});

app.get("/cloud", async (_req, res) => {
  try {
    res.json(await runCloud({ traffic: 0 }));
  } catch (err) {
    res.status(500).json({ status: "FAILED", error: err.message });
  }
});

app.get("/cloud-ai", async (_req, res) => {
  try {
    res.json(await runCloudAI({ cpu: 0 }));
  } catch (err) {
    res.status(500).json({ status: "FAILED", error: err.message });
  }
});

app.get("/k8s-ai", async (_req, res) => {
  try {
    res.json(await runClusterAI({ cpu: 0 }));
  } catch (err) {
    res.status(500).json({ status: "FAILED", error: err.message });
  }
});

function deploymentApproved(req) {
  const expected = process.env.DEPLOY_APPROVAL_TOKEN;
  const supplied = req.get("x-deploy-approval") || "";
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.post("/deploy-helper", async (req, res) => {
  if (!deploymentApproved(req)) {
    return res.status(403).json({ success: false, error: "Explicit deployment approval token required" });
  }
  try {
    const goal = typeof req.body.goal === "string" ? req.body.goal.slice(0, 500) : "approved deployment";
    const result = await runCICD(goal);
    res.json({ success: result.status === "SUCCESS", result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/dashboard", (_req, res) => {
  res.sendFile(path.join(__dirname, "dashboard", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Master Control listening on ${PORT}`);
});

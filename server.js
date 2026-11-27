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

function safeEqual(expected, supplied) {
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_TOKEN || "";
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (expected.length < 32) return res.status(503).json({ error: "ADMIN_API_TOKEN (32+ characters) is not configured." });
  if (!safeEqual(expected, token)) return res.status(401).json({ error: "Administrator authentication required." });
  next();
}

const requestBuckets = new Map();
function adminRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  let bucket = requestBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) bucket = { count: 0, resetAt: now + 15 * 60 * 1000 };
  bucket.count += 1;
  requestBuckets.set(key, bucket);
  if (bucket.count > 30) return res.status(429).json({ error: "Too many admin requests. Wait and try again." });
  next();
}

app.get("/", (_req, res) => res.send("AI COMPANY OS is online"));
app.get("/health", (_req, res) => res.status(200).json({ ok: true, service: "ai-master-control-v7" }));
app.get("/logs", requireAdmin, adminRateLimit, (_req, res) => {
  res.json({ status: "LIVE_LOG_STREAM", logs: ["System running"], time: Date.now() });
});

app.get("/cloud", requireAdmin, adminRateLimit, async (_req, res) => {
  try { res.json(await runCloud({ traffic: 0 })); }
  catch (err) { res.status(500).json({ status: "FAILED", error: err.message }); }
});

app.get("/cloud-ai", requireAdmin, adminRateLimit, async (_req, res) => {
  try { res.json(await runCloudAI({ cpu: 0 })); }
  catch (err) { res.status(500).json({ status: "FAILED", error: err.message }); }
});

app.get("/k8s-ai", requireAdmin, adminRateLimit, async (_req, res) => {
  try { res.json(await runClusterAI({ cpu: 0 })); }
  catch (err) { res.status(500).json({ status: "FAILED", error: err.message }); }
});

app.post("/deploy-helper", requireAdmin, adminRateLimit, async (req, res) => {
  if (!safeEqual(process.env.DEPLOY_APPROVAL_TOKEN || "", req.get("x-deploy-approval") || "")) {
    return res.status(403).json({ success: false, error: "A separate deployment approval token is required." });
  }
  try {
    const goal = typeof req.body?.goal === "string" ? req.body.goal.trim().slice(0, 500) : "";
    if (!goal) return res.status(400).json({ success: false, error: "A deployment goal is required." });
    const result = await runCICD(goal);
    res.json({ success: result.status === "SUCCESS", result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Deployment helper failed." });
  }
});

app.get("/dashboard", (_req, res) => res.sendFile(path.join(__dirname, "dashboard", "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log("AI Master Control listening on " + PORT));

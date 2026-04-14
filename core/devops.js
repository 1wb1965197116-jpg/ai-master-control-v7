const { runCICD } = require("./cicd");

async function runDevOps(metrics) {

  try {

    console.log("🧠 DevOps running...");

    let decision = "idle";

    if (metrics.lastDeployFailed) {
      decision = "rollback";
    }

    if (metrics.changesDetected) {
      decision = "deploy";
    }

    if (metrics.errorRate > 5) {
      decision = "pause";
    }

    // =========================
    // 🚀 DEPLOY
    // =========================
    if (decision === "deploy") {

      const result = await runCICD("auto deploy");

      return {
        status: "DEPLOYED",
        result
      };
    }

    // =========================
    // 🔁 ROLLBACK
    // =========================
    if (decision === "rollback") {
      return {
        status: "ROLLBACK_TRIGGERED",
        action: "revert to last stable build"
      };
    }

    // =========================
    // ⏸ PAUSE
    // =========================
    if (decision === "pause") {
      return {
        status: "PAUSED",
        reason: "High error rate detected"
      };
    }

    return {
      status: "IDLE"
    };

  } catch (err) {

    return {
      status: "DEVOPS_ERROR",
      error: err.message
    };
  }
}

module.exports = { runDevOps };

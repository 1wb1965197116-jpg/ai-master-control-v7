const { runCICD } = require("./cicd");
const { shouldDeploy } = require("../brain/autoDeployBrain");
const { logDeploy, getLastDeploy } = require("../brain/deployHistory");

async function runDevOps(metrics) {

  const decision = shouldDeploy(metrics);

  console.log("🧠 DevOps Decision:", decision);

  // 🚀 DEPLOY
  if (decision === "deploy") {

    const result = await runCICD("auto deploy");

    logDeploy({
      type: "deploy",
      result
    });

    return result;
  }

  // 🔁 ROLLBACK
  if (decision === "rollback") {

    const last = getLastDeploy();

    return {
      status: "ROLLBACK_TRIGGERED",
      revertingTo: last
    };
  }

  // ⏸ PAUSE
  if (decision === "pause") {
    return {
      status: "DEPLOY_PAUSED",
      reason: "High error rate"
    };
  }

  return {
    status: "IDLE"
  };
}

module.exports = { runDevOps };

const { decideInfra } = require("../brain/infraAI");
const { deployApp } = require("./deploymentManager");
const { registerService } = require("./serviceRegistry");

async function runCloudAI(metrics) {

  const decision = decideInfra(metrics);

  let action = {};

  if (decision === "scale_up") {
    action = deployApp("ai-service");
    registerService("ai-service");
  }

  return {
    decision,
    action
  };
}

module.exports = { runCloudAI };

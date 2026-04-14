const { decideInfra } = require("../brain/infraDecisionAI");
const { createDeployment } = require("./k8sEngine");
const { createDockerfile } = require("./dockerEngine");

function runClusterAI(metrics) {

  const decision = decideInfra(metrics);

  let output = {};

  if (decision === "scale_up") {
    output = {
      action: "DEPLOY_NEW_POD",
      dockerfile: createDockerfile("ai-service"),
      k8s: createDeployment("ai-service")
    };
  }

  if (decision === "scale_down") {
    output = {
      action: "REDUCE_REPLICAS",
      replicas: 1
    };
  }

  return {
    decision,
    output
  };
}

module.exports = { runClusterAI };

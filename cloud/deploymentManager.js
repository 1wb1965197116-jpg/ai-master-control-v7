const { createDeployment } = require("./k8sOrchestrator");

function deployApp(appName) {

  const deployment = createDeployment(appName);

  return {
    status: "DEPLOYED_TO_CLUSTER",
    deployment
  };
}

module.exports = { deployApp };

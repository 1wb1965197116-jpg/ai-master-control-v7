function decideProduct(goal) {

  if (goal.includes("dashboard")) {
    return "react-dashboard-app";
  }

  if (goal.includes("ai tool")) {
    return "node-ai-api-service";
  }

  if (goal.includes("saas")) {
    return "full-stack-saas-template";
  }

  return "generic-web-app";
}

module.exports = { decideProduct };

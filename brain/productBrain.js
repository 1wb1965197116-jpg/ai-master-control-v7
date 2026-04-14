function decideProduct(goal) {

  goal = goal.toLowerCase();

  if (goal.includes("dashboard")) return "dashboard";
  if (goal.includes("saas")) return "saas";
  if (goal.includes("api")) return "api-service";

  return "basic-app";
}

module.exports = { decideProduct };

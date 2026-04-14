const { decideCompanyDirection } = require("../brain/ceoBrain");
const { buildSystem } = require("./factory");
const { generateBusinessModel } = require("../brain/businessBrain");
const { attachRevenue } = require("../brain/revenueEngine");

async function runCompany(metrics) {

  console.log("🏢 AI COMPANY OS RUNNING");

  const decision = decideCompanyDirection(metrics);

  let result = {};

  if (decision === "build_new_saas") {
    result = await buildSystem("saas dashboard");
  }

  if (decision === "optimize_existing") {
    result = await buildSystem("optimize apps");
  }

  if (decision === "stabilize_system") {
    result = { status: "running diagnostics" };
  }

  // BUSINESS LAYER ALWAYS APPLIES
  const business = generateBusinessModel("saas");
  result = attachRevenue(result, business);

  return {
    decision,
    result
  };
}

module.exports = { runCompany };

const { decideProduct } = require("../brain/productBrain");
const { generateApp } = require("../agents/generator.agent");
const { autoFix } = require("../brain/fixEngine");
const { simulateStart } = require("../brain/simulator");
const { testApp } = require("../brain/test");
const { deploy } = require("../deploy/deploy");

async function buildSystem(goal) {

  console.log("🏭 Factory starting...");

  // 1. Decide app type
  const type = decideProduct(goal);

  // 2. Generate app
  let app = generateApp(type);

  // 3. Auto fix generated code
  app.backend = autoFix(app.backend || "");
  app.frontend = autoFix(app.frontend || "");

  // 4. Simulate runtime BEFORE deploy
  const simulation = simulateStart([app.backend, app.frontend]);

  if (!simulation.safe) {
    return {
      status: "BLOCKED",
      reason: simulation.errors
    };
  }

  // 5. Test system
  const test = testApp(app);

  if (!test.safeToDeploy) {
    return {
      status: "BLOCKED_BY_TEST",
      test
    };
  }

  // 6. Deploy
  const live = await deploy(app);

  return {
    status: "LIVE",
    type,
    test,
    deploy: live
  };
}

module.exports = { buildSystem };

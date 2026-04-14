const { decideProduct } = require("../brain/productBrain");
const { generateApp } = require("../agents/generator.agent");
const { autoFix } = require("../brain/fixEngine");
const { simulateStart } = require("../brain/simulator");

async function buildSystem(goal) {

  console.log("🏭 SOFTWARE FACTORY STARTED");

  // STEP 1: decide what to build
  const type = decideProduct(goal);

  // STEP 2: generate app
  let app = generateApp(type);

  // STEP 3: auto fix generated code
  app.backend = autoFix(app.backend);
  app.frontend = autoFix(app.frontend);

  // STEP 4: simulate before deploy
  const test = simulateStart([app.backend, app.frontend]);

  return {
    type,
    app,
    test
  };
}

module.exports = { buildSystem };

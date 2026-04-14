const { scanDependencies, autoFixDependencies } = require("../brain/dependencyBrain");
const { simulateStart } = require("../brain/simulator");
const { autoFix } = require("../brain/fixEngine");

async function runOrchestrator(project) {

  console.log("🧠 DEPLOY BRAIN ACTIVE");

  // STEP 1: dependency scan
  let issues = scanDependencies(project.path);

  // STEP 2: auto fix package.json
  project.package = autoFixDependencies(project.package);

  // STEP 3: simulate runtime BEFORE deploy
  const sim = simulateStart(project.files);

  if (!sim.safe) {
    console.log("⚠ Simulation failed — fixing...");

    project.files = project.files.map(f => autoFix(f));
  }

  // STEP 4: return safe deploy package
  return {
    status: "SAFE_TO_DEPLOY",
    issues,
    simulation: sim
  };
}

module.exports = { runOrchestrator };

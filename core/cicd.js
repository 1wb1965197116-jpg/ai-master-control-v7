const { buildSystem } = require("./factory");

async function runCICD(goal) {

  console.log("🚀 CI/CD PIPELINE STARTED");

  // STEP 1: BUILD
  const build = await buildSystem(goal);

  // STEP 2: VALIDATE BUILD
  if (!build || build.status === "BLOCKED") {
    return {
      status: "FAILED_BUILD",
      reason: build
    };
  }

  // STEP 3: DEPLOY SIMULATION
  const deploy = {
    platform: "render/vercel auto-detect",
    status: "DEPLOYED",
    url: `https://app-${Date.now()}.vercel.app`
  };

  return {
    status: "SUCCESS",
    build,
    deploy
  };
}

module.exports = { runCICD };

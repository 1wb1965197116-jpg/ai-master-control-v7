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

module.exports = { const simpleGit = require("simple-git");
const fetch = require("node-fetch");
const git = simpleGit();

async function pushToGitHub() {

  console.log("📦 Committing changes...");

  await git.add(".");
  await git.commit("🤖 AI auto deploy update");
  await git.push("origin", "main");

  return true;
}

async function triggerVercel() {

  console.log("🚀 Triggering Vercel deploy...");

  const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
    method: "POST"
  });

  return await res.text();
}

async function runCICD(goal) {

  try {
    console.log("🧠 CI/CD STARTED:", goal);

    // 1. Push to GitHub
    await pushToGitHub();

    // 2. Trigger Vercel deploy
    const deployResponse = await triggerVercel();

    return {
      status: "SUCCESS",
      github: "pushed",
      vercel: "triggered",
      deployResponse
    };

  } catch (err) {

    return {
      status: "FAILED",
      error: err.message
    };
  }
}

module.exports = { runCICD };

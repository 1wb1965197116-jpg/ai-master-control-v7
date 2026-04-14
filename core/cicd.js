const simpleGit = require("simple-git");
const fetch = require("node-fetch");

const git = simpleGit();

async function pushToGitHub() {
  await git.add(".");
  await git.commit("🤖 AI auto deploy update");
  await git.push("origin", "main");
  return true;
}

async function triggerVercel() {
  const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
    method: "POST"
  });

  return await res.text();
}

async function runCICD(goal) {

  try {
    console.log("🚀 CI/CD START:", goal);

    await pushToGitHub();
    const deploy = await triggerVercel();

    return {
      status: "SUCCESS",
      github: "pushed",
      vercel: "triggered",
      deploy
    };

  } catch (err) {

    return {
      status: "FAILED",
      error: err.message
    };
  }
}

module.exports = { runCICD };
const simpleGit = require("simple-git");
const fetch = require("node-fetch");

const git = simpleGit();

// =========================
// 🧠 FORCE GIT IDENTITY (FIX FOR RENDER)
// =========================
git.addConfig("user.name", "AI DevOps Bot");
git.addConfig("user.email", "ai@autodeploy.local");

async function pushToGitHub() {

  console.log("📦 Git commit starting...");

  await git.add(".");
  await git.commit("🤖 AI auto deploy update");
  await git.push("origin", "main");

  return true;
}

async function triggerVercel() {

  const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
    method: "POST"
  });

  return await res.text();
}

async function runCICD(goal) {

  try {

    console.log("🚀 CI/CD START:", goal);

    await pushToGitHub();
    const deploy = await triggerVercel();

    return {
      status: "SUCCESS",
      github: "pushed",
      vercel: "triggered",
      deploy
    };

  } catch (err) {

    return {
      status: "FAILED",
      error: err.message
    };
  }
}

module.exports = { runCICD };

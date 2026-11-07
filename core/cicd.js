const simpleGit = require("simple-git");
const fetch = require("node-fetch");

const git = simpleGit();

// =========================
// 🧠 GIT CONFIG FIX (RENDER SAFE)
// =========================
// No git configuration is changed on import.


// =========================
// 📦 PUSH TO GITHUB
// =========================
async function pushToGitHub() {

  console.log("📦 Git staging...");

  await git.add(".");
  await git.commit("🤖 AI auto deploy update");

  console.log("🚀 Pushing to GitHub...");
  await git.push("origin", "main");

  return true;
}

// =========================
// 🚀 TRIGGER VERCEL
// =========================
async function triggerVercel() {

  if (!process.env.VERCEL_DEPLOY_HOOK) {
    throw new Error("Missing VERCEL_DEPLOY_HOOK");
  }

  const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
    method: "POST"
  });

  return await res.text();
}

// =========================
// 🧠 MAIN CI/CD ENGINE
// =========================
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

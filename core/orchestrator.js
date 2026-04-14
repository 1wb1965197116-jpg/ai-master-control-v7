const scout = require("../agents/scout.agent");
const fixer = require("../agents/fixer.agent");
const tester = require("../agents/tester.agent");
const deploy = require("../agents/deploy.agent");

async function runOrchestrator() {
  console.log("🧠 Scout scanning repos...");

  const repos = await scout.scan();

  let report = [];

  for (let repo of repos) {

    console.log("⚙️ Processing:", repo.name);

    const fixes = await fixer.fix(repo);
    const test = await tester.test(repo);
    const deployStatus = await deploy.deploy(repo);

    report.push({
      repo: repo.name,
      fixes,
      test,
      deploy: deployStatus
    });
  }

  return report;
}

module.exports = { runOrchestrator };

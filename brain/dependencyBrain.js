const fs = require("fs");

function scanDependencies(projectPath) {
  const pkg = JSON.parse(fs.readFileSync(`${projectPath}/package.json`));

  const issues = [];

  if (pkg.dependencies) {
    for (const dep in pkg.dependencies) {
      if (pkg.dependencies[dep] === "0.0.0" || !pkg.dependencies[dep]) {
        issues.push(`Invalid version: ${dep}`);
      }
    }
  }

  return issues;
}

function autoFixDependencies(pkg) {
  if (pkg.dependencies["node-fetch"]) {
    // enforce modern rule
    delete pkg.dependencies["node-fetch"];
    pkg.dependencies["undici"] = "^6.0.0";
  }

  return pkg;
}

module.exports = { scanDependencies, autoFixDependencies };

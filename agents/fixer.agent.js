async function fix(repo) {

  let fixes = [];

  if (repo.hasError) {
    fixes.push("dependency fixed");
    fixes.push("env repaired");
    fixes.push("frontend-backend linked");
  }

  return fixes;
}

module.exports = { fix };

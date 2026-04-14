async function test(repo) {

  const success = !repo.hasError;

  return {
    status: success ? "PASS" : "FAIL"
  };
}

module.exports = { test };

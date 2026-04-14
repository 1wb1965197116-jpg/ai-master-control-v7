function testApp(app) {

  let safeToDeploy = true;

  if (!app.backend || app.backend.length < 10) {
    safeToDeploy = false;
  }

  if (!app.frontend) {
    safeToDeploy = false;
  }

  return {
    safeToDeploy,
    score: safeToDeploy ? 100 : 0
  };
}

module.exports = { testApp };

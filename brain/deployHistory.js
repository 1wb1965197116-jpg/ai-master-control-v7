let history = [];

function logDeploy(entry) {
  history.push({
    ...entry,
    time: Date.now()
  });
}

function getLastDeploy() {
  return history[history.length - 1] || null;
}

module.exports = { logDeploy, getLastDeploy };

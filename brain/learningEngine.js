const fs = require("fs");

const LOG_FILE = "./brain/learning.log";

function logEvent(event) {
  const logs = fs.existsSync(LOG_FILE)
    ? JSON.parse(fs.readFileSync(LOG_FILE))
    : [];

  logs.push({
    event,
    time: Date.now()
  });

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

function analyzePatterns() {
  const logs = fs.existsSync(LOG_FILE)
    ? JSON.parse(fs.readFileSync(LOG_FILE))
    : [];

  const failures = logs.filter(l => l.event.includes("FAIL"));

  return {
    failureCount: failures.length,
    trend: failures.length > 5 ? "UNSTABLE" : "STABLE"
  };
}

module.exports = { logEvent, analyzePatterns };

let metrics = {
  revenue: 0,
  errors: 0,
  traffic: 0,
  apps: 0
};

function updateMetrics(update) {
  metrics = { ...metrics, ...update };
  return metrics;
}

function getMetrics() {
  return metrics;
}

module.exports = { updateMetrics, getMetrics };

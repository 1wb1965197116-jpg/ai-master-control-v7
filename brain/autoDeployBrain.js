function shouldDeploy(metrics) {

  if (metrics.lastDeployFailed) {
    return "rollback";
  }

  if (metrics.changesDetected) {
    return "deploy";
  }

  if (metrics.errorRate > 5) {
    return "pause";
  }

  return "idle";
}

module.exports = { shouldDeploy };

function decideCompanyDirection(metrics) {

  if (metrics.revenue < 100) {
    return "build_new_saas";
  }

  if (metrics.errors > 5) {
    return "stabilize_system";
  }

  if (metrics.traffic > 1000) {
    return "scale_products";
  }

  return "optimize_existing";
}

module.exports = { decideCompanyDirection };

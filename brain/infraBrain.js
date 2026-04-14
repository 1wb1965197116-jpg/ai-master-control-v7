function decideScaling(metrics) {

  if (metrics.traffic > 1000) {
    return "scale_up";
  }

  if (metrics.traffic < 100) {
    return "scale_down";
  }

  return "stable";
}

module.exports = { decideScaling };

function decideInfra(metrics) {

  if (metrics.cpu > 70) return "scale_up";
  if (metrics.cpu < 20) return "scale_down";

  return "stable";
}

module.exports = { decideInfra };

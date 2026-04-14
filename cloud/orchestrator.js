const { decideScaling } = require("../brain/infraBrain");
const { scaleSystem } = require("./scaler");
const { routeTraffic } = require("./router");

async function runCloud(metrics) {

  const decision = decideScaling(metrics);

  const scaling = scaleSystem(decision);

  const routing = routeTraffic(["app1", "app2"]);

  return {
    decision,
    scaling,
    routing
  };
}

module.exports = { runCloud };

function deployGate(result) {

  if (result.simulation.safe !== true) {
    return {
      deploy: false,
      reason: "Simulation failed"
    };
  }

  return {
    deploy: true,
    reason: "Passed all safety checks"
  };
}

module.exports = { deployGate };

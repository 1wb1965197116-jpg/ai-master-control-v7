function selfHeal(system) {

  if (system.errors > 0) {
    return {
      action: "auto-fix triggered",
      status: "repairing"
    };
  }

  return {
    action: "none",
    status: "healthy"
  };
}

module.exports = { selfHeal };

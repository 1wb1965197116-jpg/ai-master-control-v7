function simulateStart(files) {

  const errors = [];

  files.forEach(f => {

    if (!f) return;

    if (f.includes("require('node-fetch')")) {
      errors.push("Deprecated fetch detected");
    }

    if (f.includes("express") && !f.includes("listen")) {
      errors.push("Server missing listen()");
    }
  });

  return {
    safe: errors.length === 0,
    errors
  };
}

module.exports = { simulateStart };

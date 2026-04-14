function simulateStart(files) {

  const errors = [];

  files.forEach(f => {
    if (f.includes("require('node-fetch')")) {
      errors.push("Deprecated fetch dependency detected");
    }

    if (f.includes("express") && !f.includes("app.listen")) {
      errors.push("Server missing listen()");
    }
  });

  return {
    safe: errors.length === 0,
    errors
  };
}

module.exports = { simulateStart };

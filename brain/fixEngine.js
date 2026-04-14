function autoFix(code) {

  // FIX 1: replace node-fetch
  code = code.replace(
    "require('node-fetch')",
    "global.fetch"
  );

  // FIX 2: enforce express version safety handled elsewhere

  return code;
}

module.exports = { autoFix };

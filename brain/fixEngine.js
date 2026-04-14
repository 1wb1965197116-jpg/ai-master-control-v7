function autoFix(code) {

  if (!code) return "";

  // FIX: remove bad fetch patterns (Render issue fix)
  code = code.replace(/require\("node-fetch"\)/g, "global.fetch");

  return code;
}

module.exports = { autoFix };

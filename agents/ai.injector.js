const fs = require("fs");

function injectAI(repoPath) {

  const aiHelper = `
const askAI = async (msg) => {
  return "AI response for: " + msg;
};

module.exports = { askAI };
`;

  fs.writeFileSync(`${repoPath}/ai-helper.js`, aiHelper);

  console.log("🧠 AI injected into:", repoPath);
}

module.exports = { injectAI };

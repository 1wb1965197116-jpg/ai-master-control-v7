const fetch = require("node-fetch");

async function scan() {
  return [
    { name: "app-1", hasError: true },
    { name: "app-2", hasError: false }
  ];
}

module.exports = { scan };

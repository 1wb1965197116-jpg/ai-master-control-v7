function fixCORS(serverCode) {

  if (!serverCode.includes("cors")) {
    return `
const cors = require('cors');
app.use(cors());
` + serverCode;
  }

  return serverCode;
}

module.exports = { fixCORS };

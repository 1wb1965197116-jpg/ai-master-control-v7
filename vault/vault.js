const crypto = require("crypto");

const SECRET = process.env.MASTER_SECRET || "dev_secret";

function encrypt(text) {
  return crypto.createHash("sha256").update(text + SECRET).digest("hex");
}

module.exports = { encrypt };

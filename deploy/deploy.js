async function deploy(app) {

  console.log("🚀 Deploying app...");

  return {
    url: `https://app-${Date.now()}.vercel.app`,
    status: "deployed"
  };
}

module.exports = { deploy };

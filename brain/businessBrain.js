function generateBusinessModel(type) {

  if (type === "dashboard") {
    return {
      idea: "Analytics Dashboard SaaS",
      pricing: "$0.00/month",
      monetization: "subscription"
    };
  }

  if (type === "api-service") {
    return {
      idea: "API SaaS service",
      pricing: "pay-per-call",
      monetization: "usage-based"
    };
  }

  return {
    idea: "basic web tool",
    pricing: "free + ads",
    monetization: "ads"
  };
}

module.exports = { generateBusinessModel };

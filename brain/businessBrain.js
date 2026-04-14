function generateBusinessModel(type) {

  const base = {
    monetization: "subscription",
    price: "$0.00/month",
    scaling: true
  };

  if (type.includes("saas")) {
    return {
      ...base,
      niche: "SaaS productivity tools",
      pricing: "$0.00-$0.00/month",
      upsell: "pro analytics + AI features"
    };
  }

  if (type.includes("api")) {
    return {
      monetization: "usage-based",
      price: "$0.00/request"
    };
  }

  return base;
}

module.exports = { generateBusinessModel };

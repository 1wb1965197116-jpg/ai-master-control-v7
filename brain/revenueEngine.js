function attachRevenue(app, businessModel) {

  app.monetization = {
    model: businessModel.monetization,
    price: businessModel.pricing,
    tracking: true
  };

  return app;
}

module.exports = { attachRevenue };

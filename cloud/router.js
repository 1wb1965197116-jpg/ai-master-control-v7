function routeTraffic(apps) {

  return apps.map(app => ({
    app,
    route: `/api/${app}`
  }));
}

module.exports = { routeTraffic };

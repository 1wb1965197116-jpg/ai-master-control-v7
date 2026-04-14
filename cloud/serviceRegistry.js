let services = [];

function registerService(name) {
  services.push(name);
  return services;
}

function listServices() {
  return services;
}

module.exports = { registerService, listServices };

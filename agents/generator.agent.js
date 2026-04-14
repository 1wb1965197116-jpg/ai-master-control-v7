function generateApp(type) {

  const app = {
    frontend: "",
    backend: ""
  };

  if (type === "dashboard") {
    app.frontend = "<html>Dashboard UI</html>";
    app.backend = "const express=require('express');";
  }

  if (type === "api-service") {
    app.backend = "const express=require('express'); API server";
  }

  if (type === "saas") {
    app.frontend = "<html>SaaS UI</html>";
    app.backend = "const express=require('express'); SaaS backend";
  }

  return app;
}

module.exports = { generateApp };

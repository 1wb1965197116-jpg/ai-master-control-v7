function generateApp(type) {

  const base = {
    frontend: "",
    backend: "",
    package: {}
  };

  if (type === "react-dashboard-app") {
    base.frontend = "<html>Dashboard UI</html>";
    base.backend = "express server";
  }

  if (type === "node-ai-api-service") {
    base.backend = "AI API endpoints";
  }

  return base;
}

module.exports = { generateApp };

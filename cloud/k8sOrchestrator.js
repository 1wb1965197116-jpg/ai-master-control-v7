function createDeployment(appName) {

  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: appName },
    spec: {
      replicas: 2,
      template: {
        spec: {
          containers: [
            {
              name: appName,
              image: `${appName}:latest`,
              ports: [{ containerPort: 3000 }]
            }
          ]
        }
      }
    }
  };
}

module.exports = { createDeployment };

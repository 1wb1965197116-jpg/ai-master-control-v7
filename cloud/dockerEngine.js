function createDockerfile(appName) {

  return `
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
`;
}

module.exports = { createDockerfile };

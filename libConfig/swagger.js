const config = require("config");
module.exports = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "BASE API EXPRESS",
      description: "API with good practices",
      servers: [`${config.get("host")}:${config.get("port")}`],
    },
  },
  apis: ["app.js", "./apiServices/users/routes.js"],
};

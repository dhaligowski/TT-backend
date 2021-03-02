const compression = require("compression");
const helmet = require("helmet");
cont = compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};

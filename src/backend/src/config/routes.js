const express = require("express");

module.exports = function(server) {
  const router = express.Router();
  server.use("/api", router);

  const projectsService = require("../api/projectsService");
  projectsService.register(router, "/projects");
};

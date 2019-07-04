const Projects = require("./projects");

Projects.methods(["get", "post", "put", "delete"]);
Projects.updateOptions({ new: true, runValidators: true });

module.exports = Projects;

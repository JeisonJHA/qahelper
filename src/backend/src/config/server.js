const port = 3003;

const express = require("express");
const server = express();

server.listen(port, () => {
  console.log(`BACK IS RUNNING ON PORT: ${port}.`);
});

module.exports = server;

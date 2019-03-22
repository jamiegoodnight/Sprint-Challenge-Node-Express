const express = require("express");

const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

const lengthMax = (req, res, next) => {
  if (req.body.name.length > 129) {
    res
      .status(404)
      .json({ message: "this name must be less than 129 characters" });
    next();
  } else {
    next();
  }
};

server.use(lengthMax);

server.get("/", (req, res) => {
  res.send(console.log("server restart"));
});

module.exports = server;

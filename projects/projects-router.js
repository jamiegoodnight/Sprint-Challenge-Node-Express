const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

// GET will return all projects ----------

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "projects could not be retrieved" });
    });
});

// POST will create a project object ----------

router.post("/", (req, res) => {
  const newProject = req.body;

  if (newProject.name && newProject.description) {
    db.insert(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "there was an error saving your project" });
      });
  } else {
    res
      .status(400)
      .json({
        message: "please provide a name and description for your project"
      });
  }
});

// DELETE will remove a user object with the specified id ----------

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      if (project) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "the project with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this project could not be deleted" });
    });
});

// PUT updates a user object with the specified id ----------

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.name || updates.description) {
    db.update(id, updates)
      .then(updates => {
        if (updates) {
          res.status(200).json(updates);
        } else {
          res.status(404).json({
            message: "the project with the specified id could not be found"
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "the project information could not be modified" });
      });
  } else {
    res
      .status(400)
      .json({
        message: "please provide a name and description for this project"
      });
  }
});

// GET actions for a project object with a specified id ----------

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;

  db.getProjectActions(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "the project's actions could not be retrieved" });
    });
});

module.exports = router;

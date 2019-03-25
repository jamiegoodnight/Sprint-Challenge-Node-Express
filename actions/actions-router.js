const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

// GET will return all actions ----------

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "actions could not be retrieved" });
    });
});

// POST will create an action object ----------

router.post("/", (req, res) => {
  const newAction = req.body;

  if (newAction.notes && newAction.description && newAction.project_id) {
    db.insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "there was an error saving your action" });
      });
  } else {
    res.status(400).json({
      message: "please provide notes and a description for your action"
    });
  }
});

// DELETE will remove an action object with the specified id ----------

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(action => {
      if (action) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "the action with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this action could not be deleted" });
    });
});

// PUT updates an action object with the specified id ----------

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.notes || updates.description) {
    db.update(id, updates)
      .then(updates => {
        if (updates) {
          res.status(200).json(updates);
        } else {
          res.status(404).json({
            message: "the action with the specified id could not be found"
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "the action information could not be modified" });
      });
  } else {
    res.status(400).json({
      message: "please provide notes and a description for this action"
    });
  }
});

module.exports = router;

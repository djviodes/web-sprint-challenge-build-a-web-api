const router = require('express').Router();

const Actions = require('./actions-model');
const db = require('../../data/dbConfig');

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (action) {
                req.hub = action;
                next();
            } else {
                res.status(404).json({
                    message: `ID ${id} does not exist one bit!`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        })
}

function validateAction(req, res, next) {
    console.log(req.body);
    if (req.body === {}) {
      res.status(400).json({ message: "missing action data" });
    } else if (!req.body.project_id) {
      res.status(400).json({ message: "missing required project id field" });
    } else if (!req.body.description) {
        res.status(400).json({ message: "missing required description field" });
    } else if (!req.body.notes) {
        res.status(400).json({ message: "missing required notes field" });
    } else {
      next();
    }
  }

router.get('/', (req, res) => {
    db('actions')
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.get('/:id', [validateActionId], (req, res) => {
    res.status(200).json(req.hub);
})

router.post('/', [validateAction], (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        })
})

module.exports = router;
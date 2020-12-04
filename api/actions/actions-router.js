const router = require('express').Router();

const Actions = require('./actions-model')

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({
            message: 'Give us what we asked for... now...'
        })
    } else {
        next();
    }
}

router.get('/', (req, res) => {
  Actions.get(req.query.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: err.message,
        stack: err.stack
      })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Actions.get(id)
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'Give us a real ID before I make you give us a real ID.'
            })
        } else {
            res.status(200).json(data)
        }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: err.message,
        stack: err.stack
      })
    })
});

router.post('/', [validateAction], (req, res) => {
  Actions.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    });
});

router.put('/:id', [validateAction], (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(data => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err.message,
        stack: err.stack
      });
    });
});



module.exports = router;
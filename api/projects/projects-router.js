const router = require('express').Router();

const Projects = require('./projects-model');

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'Give us what we asked for... now...'
        })
    } else {
        next();
    }
}

router.get('/', (req, res) => {
    Projects.get(req.query.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: 'Give us a proper ID... now...'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.post('/', [validateProject], (req, res) => {
    Projects.insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.put('/:id', [validateProject], (req, res) => {
    Projects.update(req.params.id, req.body)
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
    Projects.remove(req.params.id)
        .then(data => {
            if (data) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: `You're stuck with this project... FOREVER MUAHAHAHAHAH`
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});


module.exports = router;
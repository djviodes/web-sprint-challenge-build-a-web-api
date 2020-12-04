const router = require('express').Router();

const Projects = require('./projects-model');
const db = require('../../data/dbConfig');

router.get('/api/projects', (req, res) => {
    db('projects')
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

module.exports = router;
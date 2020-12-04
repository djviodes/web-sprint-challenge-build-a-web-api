const express = require('express');

const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

const server = express();

server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API');
});

module.exports = server;

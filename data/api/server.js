const express = require('express');
const actionsRouter= require('../actions/actionsRouter');
const projectsRouter = require('../projects/projectsRouter');

const server = express();
server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>YOU ARE READY TO GET STARTED!</h2>`)

})


module.exports = server;
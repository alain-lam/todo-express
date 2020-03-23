const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./todo');

// Express
const server = express();
server.use(express.json());

// Parser
server.use(bodyParser.json());
server.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Routes
server.use('/todo', todo);


module.exports = server;
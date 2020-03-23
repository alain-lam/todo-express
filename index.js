const server = require('./server/index');

const port = 3000;

server.listen(port, () => {
	console.log("Todo app listening at " + port);
});

// PostgreSQL query based on:
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

// Project structure based on:
// https://wiki.workassis.com/nodejs-express-separate-routes/

// Test and project structure on:
// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
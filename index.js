var express = require('express')
const bodyParser = require('body-parser')
const todo = require('./todo')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

// Routes
app.use('/todo', todo)

app.listen(port, () => {
	console.log("Todo app listening at " + port)
})

// PostgreSQL query based on:
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

// Project structure based on:
// https://wiki.workassis.com/nodejs-express-separate-routes/
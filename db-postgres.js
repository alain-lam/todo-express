const Pool = require('pg').Pool
const pool = new Pool({
	user: 'dev',
	host: 'localhost',
	database: 'todo',
	password: 'dev',
	port: 5432,
})

module.exports = pool
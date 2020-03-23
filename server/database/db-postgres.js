const Pool = require('pg').Pool;
const config = require('./db-config');

const pool = new Pool({
	host: config.DB_HOST,
	port: config.DB_PORT,
	database: config.DB_DATABASE,
	user: config.DB_USER,
	password: config.DB_PASSWORD
});


/**
 * Send a custom query to the database.
 *
 * @param {String} queryString - Query string for PostgresSQL
 * @return {Object} Contains query status, and the query data
 */
async function sendQuery (queryString) {
	let status;
	let data;
	try {
		const results = await pool.query(queryString);
		status = 'sucess';
		data = results.rows;
	} catch (e) {
		status = 'error';
		data = e;
	}
	
	return { status: status, data: data };
};
 
//****************************************************/
//  GET subsection                                    /
//****************************************************/

/**
 * Get all Todos
 *
 * @return {Object} status, data
 */
function getAllTodo () {
	const getAll = `SELECT * FROM todo`;
	return sendQuery(getAll);
}

/**
 * Get a Todo by creator
 *
 * @param {String} creator - Email of the creator
 * @return {Object} status, data
 */
function getTodoByCreator (creator) {
	const getByCreator = `SELECT * FROM todo WHERE creator = '${creator}'`;
	return sendQuery(getByCreator);
}

/**
 * Get a Todo by ID
 *
 * @param {String} todoID - ID of the Todo to retrieve
 * @return {Object} status, data
 */
function getTodoByID (todoID) {
	const getById = `SELECT * FROM todo WHERE ID = ${todoID}`;
	return sendQuery(getById);
}

//****************************************************/
//  Insert subsection                                 /
//****************************************************/

/**
 * Insert a new Todo
 *
 * @param {String} title - Title of the Todo
 * @param {String} content - Content of the Todo
 * @param {String} creator - Creator of the Todo
 * @return {Object} status, data
 */
function insertTodo (title, content, creator) {
	const insertQuery = `INSERT INTO todo (title, content, creator, completed, isShared) VALUES ('${title}', '${content}', '${creator}', false, false) RETURNING *`;
	return sendQuery(insertQuery);
}

//****************************************************/
//  Update subsection                                 /
//****************************************************/

/**
 * Completely update a Todo by ID
 *
 * @param {String} todoID - ID of the Todo to update
 * @param {String} title - Title of the Todo
 * @param {String} content - Content of the Todo
 * @param {String} creator - Creator of the Todo
 * @param {String} completed - Completed status of the Todo
 * @param {String} isShared - Sharing status of the Todo
 * @return {Object} status, data
 */
function putTodoByID (todoID, title, content, creator, completed, isShared) {
	const putQuery = `UPDATE todo SET title = '${title}', content = '${content}', creator = '${creator}', completed = ${completed}, isShared = ${isShared} WHERE ID = ${todoID} RETURNING *`;
	return sendQuery(putQuery);
}


/**
 * Partially update a Todo by ID
 *
 * @param {String} todoID - ID of the Todo to update
 * @param {Array} patchParams - List of key values containing table attributes to modify
 * @return {Object} status, data
 */
function patchTodoByID (todoID, patchParams) {
	var queryParameters = '';
	for (let [key, value] of patchParams) {
		queryParameters += `${key} = '${value}', `;
	}
	queryParameters = queryParameters.slice(0, -2)
	const patchQuery = `UPDATE todo SET ${queryParameters} WHERE ID = ${todoID} RETURNING *`;
	return sendQuery(patchQuery);
}

//****************************************************/
//  Delete subsection                                 /
//****************************************************/

/**
 * Delete a Todo by ID
 *
 * @param {String} todoID - ID of the Todo to delete
 * @return {Object} status, data
 */
function deleteTodoByID (todoID) {
	const deleteQuery = `DELETE FROM todo WHERE ID = ${todoID} RETURNING *`;
	return sendQuery(deleteQuery);
}



module.exports = {
	getAllTodo: getAllTodo,
	getTodoByCreator: getTodoByCreator,
	getTodoByID: getTodoByID,
	insertTodo: insertTodo,
	putTodoByID: putTodoByID,
	patchTodoByID: patchTodoByID,
	deleteTodoByID: deleteTodoByID
};
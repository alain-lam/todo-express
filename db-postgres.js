const Pool = require('pg').Pool;

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

// Send a querry and return element of the response
async function sendQuery (queryString) {
	let code;
	let data;
    try {
        const results = await pool.query(queryString);
		code = 200;
		data = results.rows;
    } catch (e) {
		code = 400;
		data = e;
	}
	
	return { code: code, data: data };
};

//******************************************************/
//  Query section                                       /
//******************************************************/
 
//****************************************************/
//  GET subsection                                    /
//****************************************************/
 
function getAllTodo () {
	console.log(process.env.DB_DATABASE);
	const getAll = `SELECT * FROM todo`;
	return sendQuery(getAll);
}

function getTodoByCreator (creator) {
	const getByCreator = `SELECT * FROM todo WHERE creator = '${creator}'`;
    return sendQuery(getByCreator);
}

function getTodoByID (todoID) {
	const getById = `SELECT * FROM todo WHERE ID = ${todoID}`;
    return sendQuery(getById);
}

//****************************************************/
//  Insert subsection                                 /
//****************************************************/

function insertTodo (title, content, creator) {
	const insertQuery = `INSERT INTO todo (title, content, creator, completed, isShared) VALUES ('${title}', '${content}', '${creator}', false, false) RETURNING *`;
    return sendQuery(insertQuery);
}

//****************************************************/
//  Update subsection                                 /
//****************************************************/

function putTodoByID (todoID, title, content, creator, completed, isShared) {
	const putQuery = `UPDATE todo SET title = '${title}', content = '${content}', creator = '${creator}', completed = ${completed}, isShared = ${isShared} WHERE ID = ${todoID} RETURNING *`;
    return sendQuery(putQuery);
}

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
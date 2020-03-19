var express = require('express')
var router = express.Router()
var cors = require('cors')
var db = require('./db-postgres')

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Todo API: ', Date.now())
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next()
})

// Send a querry and return first element of the response
var queryOneElement = (res, query) => {
    db.query(query, (error, results) => {
        if (error) {
            res.status(400).json({error: 'No todo found'})
        }
        else {
            res.status(200).json(results.rows[0])
        }
    })
}


//******************************************************/
//  GET section                                         /
//******************************************************/
 
// Get all todos
router.get('/', cors(), function(req, res) {
    db.query(`SELECT * FROM todo`, (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).json({error: 'No todo found'})
        }
        else {
            res.status(200).json(results.rows)
        }
    })
})

// Get all todos by creator
router.get('/creator/:creator', cors(), function(req, res) {
    const getByCreator = `SELECT * FROM todo WHERE creator = '${req.params.creator}'`
    db.query( getByCreator, (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).json({error: 'No todo found'})
        }
        else {
            res.status(200).json(results.rows)
        }
    })
})

// Get todo by ID
router.get('/:id', cors(), function(req, res) {
    const getById = `SELECT * FROM todo WHERE ID = ${req.params.id}`
    queryOneElement(res, getById)
})


//******************************************************/
//  POST section                                        /
//******************************************************/

// Insert a new Todo
router.post('/', cors(), function(req, res) {
    const { title, content, creator } = req.body
    const postQuery = `INSERT INTO todo (title, content, creator, completed, isShared) VALUES ('${title}', '${content}', '${creator}', false, false) RETURNING *`
    db.query(postQuery, (error, results) => {
        if (error) {
            res.status(400).json({error: 'No todo found'})
        }
        else {
            res.status(201).json(results.rows[0])
        }
    })
})


//******************************************************/
//  PUT section                                        /
//******************************************************/

// Update completely a todo by ID
router.put('/:id', cors(), function(req, res) {
    const { title, content, creator, completed, isShared } = req.body
    const postQuery = `UPDATE todo SET title = '${title}', content = '${content}', creator = '${creator}', completed = ${completed}, isShared = ${isShared} WHERE ID = ${req.params.id} RETURNING *`
    queryOneElement(res, postQuery)
})


//******************************************************/
//  PATCH section                                       /
//******************************************************/

// Update partially a todo by ID
router.patch('/:id', cors(), function(req, res) {
    var queryParameters = ''
    for (let [key, value] of Object.entries(req.body)) {
        queryParameters += `${key} = '${value}', `;
    }
    queryParameters = queryParameters.slice(0, -2)
    const postQuery = `UPDATE todo SET ${queryParameters} WHERE ID = ${req.params.id} RETURNING *`
    queryOneElement(res, postQuery)
})

//******************************************************/
//  DELETE section                                      /
//******************************************************/

// Delete a todo by ID
router.delete('/:id', cors(), function(req, res) {
    const deleteQuery = `DELETE FROM todo WHERE ID = ${req.params.id} RETURNING *`
    queryOneElement(res, deleteQuery)
})


module.exports = router
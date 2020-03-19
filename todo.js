var express = require('express')
var router = express.Router()
var db = require('./db-postgres')

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Todo API: ', Date.now())
    next()
})

// Send a querry and return first element of the response
var queryOneElement = (res, query) => {
    db.query(query, (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(null)
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
router.get('/', function(req, res) {
    db.query(`SELECT * FROM todo`, (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(null)
        }
        else {
            res.status(200).json(results.rows)
        }
    })
})
 
// Get todo by ID
router.get('/:id', function(req, res) {
    const getById = `SELECT * FROM todo WHERE ID = ${req.params.id}`
    queryOneElement(res, getById)
})


//******************************************************/
//  POST section                                        /
//******************************************************/

// Insert a new Todo
router.post('/', function(req, res) {
    const { title, content, creator } = req.body
    const postQuery = `INSERT INTO todo (title, content, creator, completed, isShared) VALUES ('${title}', '${content}', '${creator}', false, false) RETURNING *`
    queryOneElement(res, postQuery)
})


//******************************************************/
//  PUT section                                        /
//******************************************************/

// Update a todo by ID
router.put('/:id', function(req, res) {
    const { title, content, creator, completed, isShared } = req.body
    const postQuery = `UPDATE todo SET title = '${title}', content = '${content}', creator = '${creator}', completed = ${completed}, isShared = ${isShared} WHERE ID = ${req.params.id} RETURNING *`
    queryOneElement(res, postQuery)
})


//******************************************************/
//  DELETE section                                      /
//******************************************************/

// Delete a todo by ID
router.delete('/:id', function(req, res) {
    const deleteQuery = `DELETE FROM todo WHERE ID = ${req.params.id} RETURNING *`
    queryOneElement(res, deleteQuery)
})


module.exports = router
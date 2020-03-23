const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./db-postgres');


//******************************************************/
//  GET section                                         /
//******************************************************/
 
// Get all todos
router.get('/', cors(), async (req, res) => {
    const { code, data } = await db.getAllTodo();
    res.status(code).json(data);
});

// Get all todos by creator
router.get('/creator/:creator', cors(), async (req, res) => {
    const { code, data } = await db.getTodoByCreator(req.params.creator);
    res.status(code).json(data);
});

// Get todo by ID
router.get('/:id', cors(), async (req, res) => {
    const { code, data } = await db.getTodoByID(req.params.id);
    res.status(code).json(data[0]);
});


//******************************************************/
//  POST section                                        /
//******************************************************/

// Insert a new Todo
router.post('/', cors(), async (req, res) => {
    const { title, content, creator } = req.body;
    const { code, data } = await db.insertTodo(title, content, creator);
    res.status(code).json(data[0]);
});


//******************************************************/
//  PUT section                                        /
//******************************************************/

// Update completely a todo by ID
router.put('/:id', cors(), async (req, res) => {
    const { title, content, creator, completed, isShared } = req.body;
    const { code, data } = await db.putTodoByID(req.params.id, title, content, creator, completed, isShared);
    res.status(code).json(data[0]);
});


//******************************************************/
//  PATCH section                                       /
//******************************************************/

// Update partially a todo by ID
router.patch('/:id', cors(), async (req, res) => {
    const { code, data } = await db.patchTodoByID(req.params.id, Object.entries(req.body));
    res.status(code).json(data[0]);
});

//******************************************************/
//  DELETE section                                      /
//******************************************************/

// Delete a todo by ID
router.delete('/:id', cors(), async (req, res) => {
    const { code, data } = await db.deleteTodoByID(req.params.id);
    res.status(code).json(data[0]);
});


module.exports = router;
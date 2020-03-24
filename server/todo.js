const express = require('express');
const router = express.Router();
const db = require('./database/db-postgres');

// Response code
const HttpCode = {
	SUCESS_DEFAULT: 200,
	SUCESS_POST: 201,
	ERROR_DEFAULT: 400
}

// Set CORS
router.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
})


//******************************************************/
//  GET section                                         /
//******************************************************/
 
// Get all todos
router.get('/', async (req, res) => {
    const { status, data } = await db.getAllTodo();
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;
    res.status(code).json(data);
});

// Get all todos by creator
router.get('/creator/:creator', async (req, res) => {
    const { status, data } = await db.getTodoByCreator(req.params.creator);
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;
    res.status(code).json(data);
});

// Get todo by ID
router.get('/:id', async (req, res) => {
    const { status, data } = await db.getTodoByID(req.params.id);
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;

    res.status(code).json(data[0]);
});


//******************************************************/
//  POST section                                        /
//******************************************************/

// Insert a new Todo
router.post('/', async (req, res) => {
    const { title, content, creator } = req.body;
    const { status, data } = await db.insertTodo(title, content, creator);
    const code = (status === 'sucess') ? HttpCode.SUCESS_POST : HttpCode.ERROR_DEFAULT;
    
    res.status(code).json(data[0]);
});


//******************************************************/
//  PUT section                                        /
//******************************************************/

// Update completely a todo by ID
router.put('/:id', async (req, res) => {
    const { title, content, creator, completed, isShared } = req.body;
    const { status, data } = await db.putTodoByID(req.params.id, title, content, creator, completed, isShared);
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;

    res.status(code).json(data[0]);
});


//******************************************************/
//  PATCH section                                       /
//******************************************************/

// Update partially a todo by ID
router.patch('/:id', async (req, res) => {
    const { status, data } = await db.patchTodoByID(req.params.id, Object.entries(req.body));
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;

    res.status(code).json(data[0]);
});

//******************************************************/
//  DELETE section                                      /
//******************************************************/

// Delete a todo by ID
router.delete('/:id', async (req, res) => {
    const { status, data } = await db.deleteTodoByID(req.params.id);
    const code = (status === 'sucess') ? HttpCode.SUCESS_DEFAULT : HttpCode.ERROR_DEFAULT;
    
    res.status(code).json(data[0]);
});


module.exports = router;
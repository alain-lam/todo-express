const request = require('supertest');
const app = require('../server/index');

//*****************************************************************//
// Section to initialize test database !!! Run only once !!!       //
//*****************************************************************//
// request(app).post('/todo')
// .send({
// 	title: 'Supertest - Title 1',
// 	content: 'Supertest - Content 1',
// 	creator: 'supertest@challengeu.com'
// });
// request(app).post('/todo')
// .send({
// 	title: 'Supertest - Title solo',
// 	content: 'Supertest - Content solo',
// 	creator: 'supertestsolo@challengeu.com'
// });
// request(app).post('/todo')
// .send({
// 	title: 'Supertest - Title update',
// 	content: 'Supertest - Content update',
// 	creator: 'supertest@challengeu.com'
// });



//*****************************************************************//
// Test section                                                    //
//*****************************************************************//

// Get all Todos
describe('Get Endpoints', () => {
	it('should get all Todos', async () => {
		const res = await request(app).get('/todo/');

		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(3);
	})
});


// Get Todo by creator
describe('Get Endpoints', () => {
	it('should get Todo by creator', async () => {
		const res = await request(app).get('/todo/creator/supertestsolo@challengeu.com');

		expect(res.statusCode).toEqual(200);
		expect(res.body[0]).toHaveProperty('id', 2);
		expect(res.body[0]).toHaveProperty('title', 'Supertest - Title solo');
		expect(res.body[0]).toHaveProperty('content', 'Supertest - Content solo');
		expect(res.body[0]).toHaveProperty('creator', 'supertestsolo@challengeu.com');
		expect(res.body[0]).toHaveProperty('completed', false);
		expect(res.body[0]).toHaveProperty('isshared', false);
	})
});


// Get Todo by ID
describe('Get Endpoints', () => {
	it('should get Todo one', async () => {
		const res = await request(app).get('/todo/1');

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', 1);
		expect(res.body).toHaveProperty('title', 'Supertest - Title 1');
		expect(res.body).toHaveProperty('content', 'Supertest - Content 1');
		expect(res.body).toHaveProperty('creator', 'supertest@challengeu.com');
		expect(res.body).toHaveProperty('completed', false);
		expect(res.body).toHaveProperty('isshared', false);
	})
});


// Put Todo
describe('Update Endpoints', () => {
	it('should put Todo three', async () => {
		const res = await request(app).put('/todo/3')
		.send({
			title: 'Supertest - Title update put',
			content: 'Supertest - Content update put',
			creator: 'supertest@challengeu.com',
			completed: true,
			isShared: true
		});
		
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', 3);
		expect(res.body).toHaveProperty('title', 'Supertest - Title update put');
		expect(res.body).toHaveProperty('content', 'Supertest - Content update put');
		expect(res.body).toHaveProperty('creator', 'supertest@challengeu.com');
		expect(res.body).toHaveProperty('completed', true);
		expect(res.body).toHaveProperty('isshared', true);
	})
});


// Patch Todo
describe('Update Endpoints', () => {
	it('should patch Todo three', async () => {
		const res = await request(app).patch('/todo/3')
		.send({
			title: 'Supertest - Title update patch',
			content: 'Supertest - Content update patch',
			isShared: false
		});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', 3);
		expect(res.body).toHaveProperty('title', 'Supertest - Title update patch');
		expect(res.body).toHaveProperty('content', 'Supertest - Content update patch');
		expect(res.body).toHaveProperty('creator', 'supertest@challengeu.com');
		expect(res.body).toHaveProperty('completed', true);
		expect(res.body).toHaveProperty('isshared', false);
	})
});


// Insert new Todo
let newID = Number;
describe('Post Endpoints', () => {
	it('should create a new Todo', async () => {
		const res = await request(app)
		.post('/todo')
		.send({
			title: 'Supertest - Title new',
			content: 'Supertest - Content new',
			creator: 'supertest@challengeu.com'
		});

		newID = res.body.id; 
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('title', 'Supertest - Title new');
		expect(res.body).toHaveProperty('content', 'Supertest - Content new');
		expect(res.body).toHaveProperty('creator', 'supertest@challengeu.com');
		expect(res.body).toHaveProperty('completed', false);
		expect(res.body).toHaveProperty('isshared', false);
	})
});


// Delete Todo
describe('Delete Endpoints', () => {
	it('should delete Todo four', async () => {
		const res = await request(app).delete(`/todo/${newID}`);;

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', newID);
		expect(res.body).toHaveProperty('title', 'Supertest - Title new');
		expect(res.body).toHaveProperty('content', 'Supertest - Content new');
		expect(res.body).toHaveProperty('creator', 'supertest@challengeu.com');
		expect(res.body).toHaveProperty('completed', false);
		expect(res.body).toHaveProperty('isshared', false);
	})
});
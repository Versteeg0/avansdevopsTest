require('http-errors')

const request = require('supertest')

const app = require('../../app')

const { db, client } = require('../../services/database')

describe('Get Users', () => {
  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    client.close()
  })

  it('should get all users in array', async () => {
    const expected = { _id: '66129abc3692273a3fa9ed54', foo: 'bar' }

    const insertedUser = await db.collection('users').insertOne(expected)

    const insertedUserId = insertedUser.insertedId;

    const res = await request(app).get('/users')

    expect(res.statusCode).toEqual(200)

    expect(res.body.length).toEqual(1)

    expect(res.body[0]).toEqual(expect.objectContaining(expected))
    expect(res.body[0]._id).toEqual(insertedUserId); // Check the _id field
    expect(res.body[0].foo).toEqual(expected.foo); // Check other fields
  })

  it('should insert a new user', async () => {
    const newUser = { _id: '66129abc3692273a3fa9ed54', name: 'test user', email: 'testuser@example.com' };

    const res = await request(app)
      .post('/users')
      .send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBeDefined();

    const insertedUser = await db.collection('users').findOne({ _id: res.body.id });
    expect(insertedUser).toEqual(expect.objectContaining(newUser));
  });
})

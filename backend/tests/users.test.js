const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const dotenv = require('dotenv');
require('dotenv').config();

beforeAll(async () => {
  const url = process.env.MONGODB_URL;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/User/add')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        age: 30,
        gender: 'male',
        rating: 1000,
        role: 'Coach'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all users', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', age: 30, gender: 'male', rating: 5, role: 'Coach'});
    await user.save();
    
    const res = await request(app).get('/User');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('name', 'John Doe');
  });

  it('should update an existing user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', age: 30, gender: 'male', rating: 5, role: 'Coach'});
    await user.save();

    const res = await request(app)
      .put(`/User/update/${user._id}`)
      .send({ name: 'Jane Doe' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'User updated');
    expect(res.body.user).toHaveProperty('name', 'Jane Doe');
  });

  it('should delete an existing user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', age: 30, gender: 'male', rating: 5, role: 'Coach'});
    await user.save();

    const res = await request(app).delete(`/User/delete/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'User Deleted');
  });

  it('should fetch a user by id', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', age: 30, gender: 'male', rating: 5, role: 'Coach'});
    await user.save();

    const res = await request(app).get(`/User/get/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('name', 'John Doe');
  });
});

import request  from 'supertest';
import app from '../app';

describe('User API',() => {
    it('Should return a list of user', async() => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    });

  it('should return a single user by ID', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should return 404 if the user is not found', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toEqual(404);
  });

  it('should create a new user', async () => {
    const newUser = { name: 'Sam Smith', email: 'sam@example.com' };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Sam Smith');
  });

  it('should update an existing user', async () => {
    const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
    const res = await request(app).put('/api/users/1').send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Updated');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete('/api/users/1');
    expect(res.statusCode).toEqual(204);
  });
});


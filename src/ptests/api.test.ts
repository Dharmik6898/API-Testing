// tests/api.test.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  const response = await request.post('/api/users/reset');
  expect(response.status()).toBe(200); 
});

test.describe('User API', () => {
  const baseURL = '/api/users';

  test('should return a list of users', async ({ request }) => {
    const response = await request.get(baseURL);
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
  });

  test('should return a single user by ID', async ({ request }) => {
    const response = await request.get(`${baseURL}/1`);
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('id', 1);
  });

  test('should return 404 if the user is not found', async ({ request }) => {
    const response = await request.get(`${baseURL}/999`);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toHaveProperty('message', 'user not found');
  });

  test('should create a new user', async ({ request }) => {
    const newUser = { name: 'Sam Smith', email: 'sam@example.com' };
    const response = await request.post(baseURL, {
      data: newUser,
    });
    expect(response.status()).toBe(201);
    const createdUser = await response.json();
    expect(createdUser).toMatchObject(newUser);
    expect(createdUser).toHaveProperty('id');
  });

  test('should update an existing user', async ({ request }) => {
    const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
    // let response = await request.get(`${baseURL}/1`); for debugging
    // console.log(await response.json());
    const response = await request.put(`${baseURL}/1`, {data: updatedUser});
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toMatchObject({ id: 1, ...updatedUser });
  });

  test('should delete a user', async ({ request }) => {
      // Delete the user with id 1 (which exists after reset)
  const response = await request.delete(`${baseURL}/1`);
  expect(response.status()).toBe(204);

  // Verify the user no longer exists
  const getUserResponse = await request.get(`${baseURL}/1`);
  expect(getUserResponse.status()).toBe(404);
  });
});

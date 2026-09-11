const request = require('supertest');
const app = require('../src/app');
const store = require('../src/data/employees.store');

beforeEach(() => {
  store.reset();
});

describe('Employees API', () => {
  test('GET /employees returns an empty list initially', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /employees creates a new employee', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: 'Alice', role: 'Engineer', email: 'alice@example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Alice',
      role: 'Engineer',
      email: 'alice@example.com',
    });
  });

  test('POST /employees fails validation when a required field is missing', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: 'Alice' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required field/);
  });

  test('GET /employees/:id returns the employee when found', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'Bob', role: 'Manager', email: 'bob@example.com' });

    const res = await request(app).get(`/employees/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Bob');
  });

  test('GET /employees/:id returns 404 when not found', async () => {
    const res = await request(app).get('/employees/999');
    expect(res.status).toBe(404);
  });

  test('PUT /employees/:id updates an existing employee', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'Carol', role: 'Designer', email: 'carol@example.com' });

    const res = await request(app)
      .put(`/employees/${created.body.id}`)
      .send({ role: 'Senior Designer' });

    expect(res.status).toBe(200);
    expect(res.body.role).toBe('Senior Designer');
  });

  test('PUT /employees/:id returns 404 when not found', async () => {
    const res = await request(app)
      .put('/employees/999')
      .send({ role: 'Senior Designer' });

    expect(res.status).toBe(404);
  });

  test('DELETE /employees/:id removes an existing employee', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'Dave', role: 'QA', email: 'dave@example.com' });

    const res = await request(app).delete(`/employees/${created.body.id}`);
    expect(res.status).toBe(204);

    const getRes = await request(app).get(`/employees/${created.body.id}`);
    expect(getRes.status).toBe(404);
  });

  test('DELETE /employees/:id returns 404 when not found', async () => {
    const res = await request(app).delete('/employees/999');
    expect(res.status).toBe(404);
  });
});

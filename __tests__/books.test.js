const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = { title: 'Divs', publisher_id: '3', released: 2018 };
    const res = await request(app).post('/api/v1/books').send(expected);

    expect(res.body).toEqual({ book_id: expect.any(String), ...expected });
  });
});

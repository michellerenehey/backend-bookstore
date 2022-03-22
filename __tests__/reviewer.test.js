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

  it('creates a reviewer', async () => {
    const expected = {
      name: 'Carlos',
      company: 'Rotten Tomatoes',
    };

    const res = await request(app).post('/api/v1/reviewers').send(expected);
    expect(res.body).toEqual({ reviewer_id: expect.any(String), ...expected });
  });
});

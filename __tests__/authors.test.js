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

  it('creates an author', async () => {
    const expected = {
      name: 'Branden Sanderson',
      dob: '5/5/1986',
      pob: 'Santa Cruz, CA',
    };
    const res = await request(app).post('/api/v1/authors').send(expected);
    expect(res.body).toEqual({ author_id: expect.any(String), ...expected });
  });
});

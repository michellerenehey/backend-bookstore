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

  it('creates a review', async () => {
    const expected = {
      rating: 1,
      reviewer_id: '4',
      review: 'Worst. Book. Ever.',
      book_id: '3',
    };
    const res = await request(app).post('/api/v1/reviews').send(expected);
    expect(res.body).toEqual({ review_id: expect.any(String), ...expected });
  });
});

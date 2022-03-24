const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

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

  it('gets a list of reviews', async () => {
    for (let i = 0; i < 150; i++) {
      await Review.insert({
        rating: 1,
        reviewer_id: '1',
        review: 'Tried reading again, still nothing',
        book_id: '2',
        title: 'How to Graduate Alchemy',
      });
    }
    const res = await request(app).get('/api/v1/reviews');
    expect(res.body.length).toEqual(100);
  });

  it('deletes a review by id', async () => {
    const res = await request(app).delete('/api/v1/reviews/1');
    const reviews = await Review.findAll();
    expect(reviews).not.toContain(res.body);
  });
});

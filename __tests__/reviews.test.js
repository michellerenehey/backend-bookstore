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
    const expected = [
      {
        rating: 5,
        reviewer_id: '1',
        review: 'Very confusing',
        book_id: '1',
        title: 'Data Structures and Algorithms',
      },
      {
        rating: 4,
        reviewer_id: '3',
        review: 'How do you even center it?',
        book_id: '3',
        title: 'What is a Div',
      },
      {
        rating: 3,
        reviewer_id: '2',
        review: 'Still dont know what a div is',
        book_id: '2',
        title: 'How to Graduate Alchemy',
      },
    ];
    const res = await request(app).get('/api/v1/reviews');
    expect(res.body).toEqual(expected);
  });

  it('deletes a review by id', async () => {
    // const expected = [
    //   {
    //     review_id: '2',
    //     rating: 3,
    //     reviewer_id: '2',
    //     review: 'Still dont know what a div is',
    //     book_id: '2',
    //   },
    //   {
    //     review_id: '3',
    //     rating: 4,
    //     reviewer_id: '3',
    //     review: 'How do you even center it?',
    //     book_id: '3',
    //   },
    // ];
    const res = await request(app).delete('/api/v1/reviews/1');
    const reviews = await Review.findAll();
    expect(reviews).not.toContain(res.body);
  });
});

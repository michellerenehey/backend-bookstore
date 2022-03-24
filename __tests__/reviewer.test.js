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

  it('gets a list of reviewers', async () => {
    const expected = [
      { reviewer_id: '1', name: 'Michelle', company: 'Google' },
      { reviewer_id: '2', name: 'Brett', company: 'Tesla' },
      { reviewer_id: '3', name: 'Kevin', company: 'Meta' },
      { reviewer_id: '4', name: 'Bailey', company: 'Netflix' },
    ];

    const res = await request(app).get('/api/v1/reviewers');
    expect(res.body).toEqual(expected);
  });

  it('gets reviewer by id', async () => {
    const expected = {
      reviewer_id: '1',
      name: 'Michelle',
      company: 'Google',
      reviews: [
        {
          review_id: '1',
          rating: 5,
          review: 'Very confusing',
          book_id: '1',
          title: 'Data Structures and Algorithms',
        },
      ],
    };
    const res = await request(app).get('/api/v1/reviewers/1');
    expect(res.body).toEqual(expected);
  });
});

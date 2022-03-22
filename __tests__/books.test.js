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

  it('gets list of books', async () => {
    const expected = [
      {
        book_id: '1',
        title: 'Data Structures and Algorithms',
        publisher_id: '2',
        released: 2018,
      },
      {
        book_id: '2',
        title: 'How to Graduate Alchemy',
        publisher_id: '1',
        released: 2018,
      },
      {
        book_id: '3',
        title: 'What is a Div',
        publisher_id: '3',
        released: 2022,
      },
      {
        book_id: '4',
        title: 'To Div or Not to Div',
        publisher_id: '3',
        released: 2021,
      },
    ];

    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  });
});

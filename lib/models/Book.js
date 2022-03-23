const pool = require('../utils/pool');

module.exports = class Book {
  book_id;
  title;
  publisher_id;
  released;

  constructor(row) {
    this.book_id = row.book_id;
    this.title = row.title;
    this.publisher_id = row.publisher_id;
    this.released = row.released;
  }

  static async insert({ title, publisher_id, released }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        books(title, publisher_id, released)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, publisher_id, released]
    );
    return new Book(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      `
    );
    return rows.map((row) => new Book(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      WHERE
        book_id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  async findPublisher() {
    const { rows } = await pool.query(
      `
      SELECT
	publishers.publisher_id,
    publishers.name
FROM
	publishers
LEFT JOIN
	books
ON
	publishers.publisher_id = books.publisher_id
WHERE
	books.book_id=$1
      `,
      [this.book_id]
    );
    [this.publisher] = rows;

    return this;
  }

  async findAuthors() {
    const { rows } = await pool.query(
      `
      SELECT
	authors.author_id,
    authors.name
FROM
	authors
LEFT JOIN
	author_book
ON
	authors.author_id = author_book.author_id
LEFT JOIN
	books
ON
	author_book.book_id = books.book_id
WHERE
	books.book_id=$1
      `,
      [this.book_id]
    );
    this.authors = rows;

    return this;
  }

  async findReviews() {
    const { rows } = await pool.query(
      `
      SELECT
	reviews.review_id,
    reviews.rating,
    reviews.review
FROM
	reviews
LEFT JOIN
	books
ON
	reviews.book_id = books.book_id
WHERE
	books.book_id=$1
      `,
      [this.book_id]
    );
    this.reviews = rows;

    return this;
  }

  async findReviewer() {
    const { rows } = await pool.query(
      `
      SELECT
	reviewers.reviewer_id,
    reviewers.name
FROM
	reviewers
LEFT JOIN
	reviews
ON
	reviews.reviewer_id = reviewers.reviewer_id
LEFT JOIN
	books
ON
	reviews.book_id = books.book_id
WHERE
	books.book_id=$1`,
      [this.book_id]
    );
    [this.reviewer] = rows;

    return this;
  }
};

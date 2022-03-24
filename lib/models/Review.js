const pool = require('../utils/pool');

module.exports = class Review {
  review_id;
  rating;
  reviewer_id;
  review;
  book_id;

  constructor(row) {
    this.review_id = row.review_id;
    this.rating = row.rating;
    this.reviewer_id = row.reviewer_id;
    this.review = row.review;
    this.book_id = row.book_id;
    if (row.title) {
      this.title = row.title;
    }
  }

  static async insert({ rating, reviewer_id, review, book_id }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (rating, reviewer_id, review, book_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [rating, reviewer_id, review, book_id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT reviews.reviewer_id, reviews.rating, reviews.review, books.book_id, books.title 
      FROM reviews 
      LEFT JOIN books 
      ON books.book_id = reviews.book_id 
      ORDER BY rating DESC 
      LIMIT 100`
    );
    return rows.map((row) => new Review(row));
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM
      reviews
      WHERE
      review_id=$1
      RETURNING
      *
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
};

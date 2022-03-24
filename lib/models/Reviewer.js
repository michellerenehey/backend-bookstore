const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row) {
    this.reviewer_id = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM reviewers');
    if (!rows[0]) return null;
    return rows.map((row) => new Reviewer(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        reviewers
      WHERE
        reviewer_id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  async findReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        review_id,
          rating,
          review,
          books.book_id,
          title
      FROM
          books
      LEFT JOIN
          reviews
      ON
          reviews.book_id = books.book_id
      LEFT JOIN
        reviewers
      ON
        reviewers.reviewer_id = reviews.reviewer_id
      WHERE
          reviewers.reviewer_id=$1
      `,
      [this.reviewer_id]
    );
    this.reviews = rows;

    return this;
  }

  static async updateById(id, attributes) {
    const updatedReviewer = await Reviewer.findById(id);
    if (!updatedReviewer) return null;
    const name = attributes.name ?? updatedReviewer.name;
    const company = attributes.company ?? updatedReviewer.company;

    const { rows } = await pool.query(
      `
        UPDATE
          reviewers
        SET
          name=$1,
          company=$2
        WHERE
          reviewer_id=$3
        RETURNING
          *
      `,
      [name, company, id]
    );

    return new Reviewer(rows[0]);
  }
};

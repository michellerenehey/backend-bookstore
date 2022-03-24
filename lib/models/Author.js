const pool = require('../utils/pool');

module.exports = class Author {
  author_id;
  name;
  dob;
  pob;

  constructor(row) {
    this.author_id = row.author_id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString('en-US');
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]
    );
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT author_id, name FROM authors');
    const result = rows.map((row) => new Author(row));
    return result.map((author) => ({
      author_id: author.author_id,
      name: author.name,
    }));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        authors
      WHERE
        author_id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Author(rows[0]);
  }

  async findBooks() {
    const { rows } = await pool.query(
      `
      SELECT
	      books.book_id,
        title, 
        released
      FROM
        books
      LEFT JOIN
        author_book
      ON
        author_book.book_id = books.book_id
      LEFT JOIN
	      authors
      ON
	      authors.author_id = author_book.author_id
      WHERE
        authors.author_id = $1
    `,
      [this.author_id]
    );
    this.books = rows;

    return this;
  }
};

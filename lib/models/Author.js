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
};

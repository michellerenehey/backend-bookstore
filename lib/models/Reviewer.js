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
};

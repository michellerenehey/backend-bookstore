const pool = require('../utils/pool');

module.exports = class Publisher {
  publisher_id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.publisher_id = row.publisher_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      'INSERT INTO publishers (name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, city, state, country]
    );
    if (!rows[0]) return null;
    return new Publisher(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT publisher_id, name FROM publishers'
    );
    return rows.map((row) => new Publisher(row));
  }
};

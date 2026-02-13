const pool = require('../config/db');

async function createTarget(name) {
  const [result] = await pool.execute(
    'INSERT INTO targets (query_name) VALUES (?)',
    [name]
  );
  return result.insertId;
}

module.exports = { createTarget };

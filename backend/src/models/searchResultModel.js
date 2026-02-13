const pool = require('../config/db');

async function saveSearchResult(data) {
  const {
    target_id,
    title,
    url,
    snippet,
    rank_position,
    content_hash
  } = data;

  try {
    await pool.execute(
      `INSERT INTO search_results 
      (target_id, title, url, snippet, rank_position, content_hash)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [target_id, title, url, snippet, rank_position, content_hash]
    );
  } catch (err) {
    // Ignore duplicate errors
    if (err.code !== 'ER_DUP_ENTRY') {
      throw err;
    }
  }
}

async function getResultsByTarget(targetId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [rows] = await pool.execute(
    `SELECT id, title, url, snippet, rank_position, created_at
     FROM search_results
     WHERE target_id = ?
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [targetId, limit, offset]
  );

  const [countResult] = await pool.execute(
    `SELECT COUNT(*) as total
     FROM search_results
     WHERE target_id = ?`,
    [targetId]
  );

  return {
    results: rows,
    total: countResult[0].total,
    page,
    limit
  };
}


module.exports = { saveSearchResult, getResultsByTarget };

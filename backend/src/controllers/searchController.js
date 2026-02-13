const generateDorks = require('../services/dorkGenerator');
const searchGoogle = require('../services/googleSearchService');
const { createTarget } = require('../models/targetModel');
const { saveSearchResult, getResultsByTarget } = require('../models/searchResultModel');
const generateHash = require('../utils/hash');

async function search(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const targetId = await createTarget(name);
    const dorks = generateDorks(name);

    let totalResults = [];

    for (let dork of dorks) {
      const results = await searchGoogle(dork);

      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        const hash = generateHash(item.link + item.title);

        await saveSearchResult({
          target_id: targetId,
          title: item.title,
          url: item.link,
          snippet: item.snippet,
          rank_position: i + 1,
          content_hash: hash
        });

        totalResults.push(item);
      }
    }

    res.json({
      message: "Search completed",
      target_id: targetId,
      results_count: totalResults.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getResults(req, res) {
  try {
    const targetId = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!targetId) {
      return res.status(400).json({ error: "Invalid target ID" });
    }

    const data = await getResultsByTarget(targetId, page, limit);

    res.json({
      target_id: targetId,
      total_results: data.total,
      page: data.page,
      limit: data.limit,
      results: data.results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
}


module.exports = { search, getResults };

const axios = require('axios');
const googleConfig = require('../config/google');

async function searchGoogle(query, startIndex = 1) {
  const url = `https://www.googleapis.com/customsearch/v1`;

  const response = await axios.get(url, {
    params: {
      key: googleConfig.apiKey,
      cx: googleConfig.cx,
      q: query,
      // start: startIndex 
    }
  });

  return response.data.items || [];
}

module.exports = searchGoogle;

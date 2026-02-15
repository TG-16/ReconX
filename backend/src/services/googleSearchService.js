// const axios = require('axios');
// const googleConfig = require('../config/google');

// async function searchGoogle(query, startIndex = 1) {
//   const url = `https://www.googleapis.com/customsearch/v1`;

//   const response = await axios.get(url, {
//     params: {
//       key: googleConfig.apiKey,
//       cx: googleConfig.cx,
//       q: query,
//       // start: startIndex 
//     }
//   });

//   return response.data.items || [];
// }

// module.exports = searchGoogle;


const axios = require("axios");

const searchGoogle = async (query) => {
  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      { q: query },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.organic.map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: "google",
    }));
  } catch (err) {
    console.error("Serper API error:", err.response?.data || err.message);
    throw err;
  }
};

module.exports =  searchGoogle ;
const axios = require("axios");

const getContentForPublicApi = async (category) => {
  const urlAPI = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.CONTENT_API_KEY}`;

  const getAllContentaFormPublicAPI = await axios.get(urlAPI);

  if (getAllContentaFormPublicAPI.data.totalResults === 0) {
    return false;
  }

  return getAllContentaFormPublicAPI.data;
};

module.exports = getContentForPublicApi;

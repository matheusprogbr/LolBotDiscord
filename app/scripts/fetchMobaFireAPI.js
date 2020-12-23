const axios = require('axios');

module.exports = async (url) => {
  const championsData = await axios.get(url);
  return championsData;
};

const axios = require("axios");
const { apiUrl, consumer_key, consumer_secret } = require("./config.json");

module.exports = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  params: {
    consumer_key,
    consumer_secret,
  },
});

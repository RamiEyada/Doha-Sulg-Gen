const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get("https://tiktokhashtags.com/hashtag/live/");
    const $ = cheerio.load(data);
    let trends = [];
    $('table tbody tr').each((index, element) => {
      const hashtag = $(element).find('td').eq(1).text().trim();
      trends.push(hashtag);
    });
    res.status(200).json(trends.slice(0, 10000));
  } catch (error) {
    res.status(500).json({ error: "Error fetching TikTok trends" });
  }
};
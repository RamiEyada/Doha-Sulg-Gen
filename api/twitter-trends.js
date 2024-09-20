const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get("https://getdaytrends.com/");
    const $ = cheerio.load(data);
    let trends = [];
    $("td.main a").each((index, element) => {
      const hashtag = $(element).text().trim();
      trends.push({ hashtag });  // Make this an object for future flexibility
    });
    res.json(trends.slice(0, 10000));
  } catch (error) {
    res.status(500).json({ error: "Error fetching Twitter trends" });
  }
};
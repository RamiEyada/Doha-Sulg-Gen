const express = require("express");
const router = express.Router(); // Correcting to use router
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("https://getdaytrends.com/");
    const $ = cheerio.load(data);
    let trends = [];
    $("td.main a").each((index, element) => {
      const hashtag = $(element).text().trim();
      trends.push({ hashtag });
    });
    res.json(trends.slice(0, 10000));
  } catch (error) {
    res.status(500).json({ error: "Error fetching Twitter trends" });
  }
});

module.exports = router;
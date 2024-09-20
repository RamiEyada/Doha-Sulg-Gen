const express = require("express");
const router = express.Router(); // Correcting to use router
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, res) => {
  try {
    const facebookTrends = await fetchTrendsFromUrl(
      "https://best-hashtags.com/hashtag/news/",
      ".tag-box-v3 p"
    );
    console.log("Fetched Facebook trends:", facebookTrends);
    res.json(facebookTrends.slice(0, 10000));
  } catch (error) {
    console.error("Error fetching Facebook trends:", error);
    res.status(500).send("Error fetching Facebook trends.");
  }
});

module.exports = router;
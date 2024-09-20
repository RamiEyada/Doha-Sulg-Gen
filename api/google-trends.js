const express = require("express");
const router = express.Router(); // Correcting to use router
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, res) => {
  try {
    const googleTrends = await fetchTrendsFromUrl(
      "https://trends.google.com/trending?geo=TR&hl=en-US&sort=title&hours=4",
      "div.mZ3RIc"
    );
    console.log("Fetched Google trends:", googleTrends);
    res.json(googleTrends.slice(0, 10000));
  } catch (error) {
    console.error("Error fetching Google trends:", error);
    res.status(500).send("Error fetching Google trends.");
  }
});

module.exports = router;
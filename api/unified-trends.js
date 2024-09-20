const express = require("express");
const router = express.Router(); 
const axios = require("axios");
const cheerio = require("cheerio");

// Helper function to fetch and parse data from URLs
const fetchTrendsFromUrl = async (url, rowSelector, columns) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let trends = [];

    $(rowSelector).each((index, row) => {
      let rowData = [];
      columns.forEach((columnSelector) => {
        rowData.push($(row).find(columnSelector).text().trim());
      });
      trends.push(rowData);
    });

    return trends;
  } catch (error) {
    console.error(`Error fetching trends from ${url}:`, error.message);
    return []; // If fetching from one URL fails, return an empty array to avoid breaking the entire API.
  }
};

// Route to fetch unified trends
router.get("/", async (req, res) => {
  try {
    const twitterTrends = await fetchTrendsFromUrl("https://getdaytrends.com/", "tr", ["td:nth-child(1)", "td:nth-child(2)"]).catch(() => []);
    const tiktokTrends = await fetchTrendsFromUrl("https://tiktokhashtags.com/hashtag/live/", "table tbody tr", ["td:nth-child(2)", "td:nth-child(3)", "td:nth-child(4)"]).catch(() => []);
    const googleTrends = await fetchTrendsFromUrl("https://trends.google.com/trending?geo=TR&hl=en-US&sort=title&hours=4", ".feed-item", ["span.title"]).catch(() => []);
    const facebookTrends = await fetchTrendsFromUrl("https://best-hashtags.com/hashtag/news/", ".tag-box", ["a"]).catch(() => []);

    const allTrends = {
      twitter: twitterTrends.slice(0, 10000),
      tiktok: tiktokTrends.slice(0, 10000),
      google: googleTrends.slice(0, 10000),
      facebook: facebookTrends.slice(0, 10000),
    };

    console.log("Unified trends fetched successfully:", allTrends);
    res.json(allTrends);
  } catch (error) {
    console.error("Error fetching unified trends:", error.message);
    res.status(500).json({ error: "Error fetching unified trends", details: error.message });
  }
});

module.exports = router;
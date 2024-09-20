const express = require("express");
const router = express.Router(); // Use router to modularize the route
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
      columns.forEach(columnSelector => {
        rowData.push($(row).find(columnSelector).text().trim());
      });
      trends.push(rowData);
    });

    return trends;
  } catch (error) {
    console.error(`Error fetching trends from ${url}:`, error);
    return []; // Return empty array in case of an error
  }
};

// Route to fetch unified trends
router.get("/", async (req, res) => {
  try {
    // Fetch from all sources
    const twitterTrends = await fetchTrendsFromUrl("https://getdaytrends.com/", "tr", ["td:nth-child(1)", "td:nth-child(2)"]) || [];
    const tiktokTrends = await fetchTrendsFromUrl("https://tiktokhashtags.com/hashtag/live/", "table tbody tr", ["td:nth-child(2)", "td:nth-child(3)", "td:nth-child(4)"]) || [];
    const googleTrends = await fetchTrendsFromUrl("https://trends.google.com/trending?geo=TR&hl=en-US&sort=title&hours=4", ".feed-item", ["span.title"]) || [];
    const facebookTrends = await fetchTrendsFromUrl("https://best-hashtags.com/hashtag/news/", ".tag-box", ["a"]) || [];

    const allTrends = {
      twitter: twitterTrends.slice(0, 10000),
      tiktok: tiktokTrends.slice(0, 10000),
      google: googleTrends.slice(0, 10000),
      facebook: facebookTrends.slice(0, 10000),
    };

    console.log("Unified trends:", allTrends);
    res.json(allTrends); // Send the response
  } catch (error) {
    console.error("Error fetching unified trends:", error);
    res.status(500).send({ error: "Error fetching unified trends" });
  }
});

module.exports = router;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

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

    console.log(`Fetched trends from ${url}:`, trends);
    return trends;
  } catch (error) {
    console.error(`Error fetching trends from ${url}:`, error);
    return [];
  }
};

// Unified API to fetch trending hashtags from various websites
app.get("/api/unified-trends", async (req, res) => {
  try {
    const twitterTrends = await fetchTrendsFromUrl("https://getdaytrends.com/", "tr", ["td:nth-child(1)", "td:nth-child(2)"]);
    const tiktokTrends = await fetchTrendsFromUrl("https://tiktokhashtags.com/hashtag/live/", "table tbody tr", ["td:nth-child(2)", "td:nth-child(3)", "td:nth-child(4)"]);
    const googleTrends = await fetchTrendsFromUrl("https://trends.google.com/trending?geo=TR&hl=en-US&sort=title&hours=4", ".feed-item", ["span.title"]);
    const facebookTrends = await fetchTrendsFromUrl("https://best-hashtags.com/hashtag/news/", ".tag-box", ["a"]);

    const allTrends = {
      twitter: twitterTrends.slice(0, 10000),
      tiktok: tiktokTrends.slice(0, 10000),
      google: googleTrends.slice(0, 10000),
      facebook: facebookTrends.slice(0, 10000),
    };

    console.log("Unified trends:", allTrends);
    res.json(allTrends);
  } catch (error) {
    console.error("Error fetching unified trends:", error);
    res.status(500).send("Error fetching unified trends.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// At the end of server.js:
module.exports = app;
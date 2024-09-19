app.get("/unified-trends", async (req, res) => {
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
app.get("/facebook-trends", async (req, res) => {
  try {
    // Update the selector to target the specific tag box elements
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
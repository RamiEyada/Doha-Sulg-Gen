app.get("/google-trends", async (req, res) => {
  try {
    // Updated selector to fetch trend names inside div.mZ3RIc
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
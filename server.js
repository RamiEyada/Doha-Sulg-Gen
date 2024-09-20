const express = require("express");
const path = require("path");

// Import trend handlers from the api folder
const facebookTrends = require("./api/facebook-trends");
const googleTrends = require("./api/google-trends");
const tiktokTrends = require("./api/tiktok-trends");
const twitterTrends = require("./api/twitter-trends");
const unifiedTrends = require("./api/unified-trends"); // Unified trends route

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "Public" folder
app.use(express.static(path.join(__dirname, "Public")));

// API Routes for individual trend sources
app.use("/api/facebook-trends", facebookTrends);
app.use("/api/google-trends", googleTrends);
app.use("/api/tiktok-trends", tiktokTrends);
app.use("/api/twitter-trends", twitterTrends);
app.use("/api/unified-trends", unifiedTrends); // Unified trends route

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app for Vercel
module.exports = app;